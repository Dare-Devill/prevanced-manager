import {
  View,
  Input,
  Spinner,
  YStack,
  ScrollView,
  YGroup,
  Card,
  Button,
  H2,
  Paragraph,
  Separator,
  XStack,
} from "tamagui";
import { useEffect, useState } from "react";
import { Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useToastController } from "@tamagui/toast";
import { PrevancedOptions } from "./config";
import { RefreshCcwDot } from "@tamagui/lucide-icons";

type Release = {
  name: string;
  fileName: string;
  version: string;
  arch: string;
  browser_download_url: string;
};

export default function TabOneScreen() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [releases, setReleases] = useState<Release[]>([]);
  const toast = useToastController();

  async function fetchReleases() {
    setLoading(true);
    const awaitedOptions = await AsyncStorage.getItem("prevancedOptions");
    const prevancedOptions: PrevancedOptions | null = JSON.parse(awaitedOptions || "{}");
    let ghReleaseUrl;
    if (prevancedOptions && prevancedOptions.ghRepo && prevancedOptions.ghReleaseTag) {
      if (prevancedOptions.ghReleaseTag == "latest") {
        ghReleaseUrl = `https://api.github.com/repos/${prevancedOptions.ghRepo}/releases/latest`;
      } else {
        ghReleaseUrl = `https://api.github.com/repos/${prevancedOptions.ghRepo}/releases/tags/${prevancedOptions.ghReleaseTag}`;
      }
    } else {
      ghReleaseUrl = "https://api.github.com/repos/Revanced-APKs/build-apps/releases/latest";
    }
    if (!ghReleaseUrl) {
      toast.show("Empty GitHub release URL", {
        native: true,
      });
      return;
    }
    const response = await fetch(
      ghReleaseUrl
    );
    if (!response.ok) {
      toast.show(`Failed to fetch releases from ${prevancedOptions?.ghRepo}`, {
        native: true,
      });
      return;
    }
    const data = await response.json();
    data.assets && setReleases(data.assets.filter((asset: Release) => !asset.name.match("magisk")).map((asset: Release) => {
      let name = asset.name.split("-")[0];
      name = name.charAt(0).toUpperCase() + name.slice(1);
      let version = asset.name.split("-")[2];
      let arch = asset.name.split("-")[3].split(".")[0];

      if (arch != "all") {
        name = name + " " + arch;
      }
      return {
        name,
        fileName: asset.name,
        version,
        arch,
        browser_download_url: asset.browser_download_url,
      };
    }));
  }
  useEffect(() => {
    async function initRelease() {
      await fetchReleases();
      setLoading(false);
    }
    initRelease();
  }, []);
  return (
    <YStack padding="$2">
      {loading ? (
          <View alignItems="center" alignSelf="center" justifyContent="center" height="100$" width="100%">
            <Spinner size="large" color="$blue11" />
          </View>
      ) : 
      <>
      <View alignItems="center">
        <Input
          placeholder="Search"
          width="100%"
          paddingStart="$6"
          paddingHorizontal="$4"
          paddingVertical="$3"
          borderRadius="$2"
          borderWidth="$1"
          onChangeText={setSearch}
          value={search}
        />
      </View>
      <View alignItems="center">
        <YGroup alignSelf="center" size="$4" paddingBottom="$12">
            <ScrollView>
              {releases
                .filter((release) =>
                  release.fileName.toLowerCase().includes(search.toLowerCase())
                )
                .reverse()
                .map((release, index) => {
                  return (
                    <YGroup.Item key={index}>
                      <Card bordered my="$2">
                        <Card.Header padded>
                          <H2>{release.name}</H2>
                          <Paragraph theme="alt1">{release.fileName}</Paragraph>
                          <Separator marginVertical="$2" />
                          <XStack alignItems="center">
                            <Paragraph>{release.version}</Paragraph>
                            <Separator alignSelf="stretch" vertical marginHorizontal={15} />
                            <Paragraph>{release.arch}</Paragraph>
                          </XStack>
                        </Card.Header>
                        <Card.Footer padded>
                          <Button
                            borderRadius="$10"
                            bordered
                            theme="blue_alt1"
                            width="100%"
                            onPress={() =>
                              Linking.openURL(release.browser_download_url)
                            }
                          >
                            Download
                          </Button>
                        </Card.Footer>
                      </Card>
                    </YGroup.Item>
                  );
                })}
            </ScrollView>
          </YGroup>
      </View>
      <Button
        theme="blue_active"
        onPress={() => {
          Promise.all([fetchReleases()]).then(() => {
            setLoading(false);
            console.log("Refreshed");
          });
        }
        }
        position="absolute"
        bottom="8%"
        right="5%"
        padding="$3"
        size="$5"
        borderRadius="$12"
      >
        <RefreshCcwDot color="white" />
      </Button>
      </>}
    </YStack>
  );
}
