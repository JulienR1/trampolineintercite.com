import { ActionIcon, Grid, Indicator, Text } from "@mantine/core";
import type { FileWithPath } from "@mantine/dropzone";
import type { FC } from "react";
import { Icon } from "../icon";

type ImagePreviewProps = {
  files: FileWithPath[];
  onRemoveFile: (file: FileWithPath) => void;
};

const CloseButton: FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <ActionIcon
      size="sm"
      radius="xl"
      color="indigo"
      variant="filled"
      onClick={onClick}>
      <Text weight="bold" size="xs" color="white">
        <Icon icon="close" />
      </Text>
    </ActionIcon>
  );
};

export const ImagePreview: FC<ImagePreviewProps> = ({
  files,
  onRemoveFile,
}) => {
  return (
    <Grid
      gutter="xl"
      align="center"
      justify="center"
      mt={files.length > 0 ? "md" : 0}>
      {files.map((file, index) => {
        const url = URL.createObjectURL(file);
        return (
          <Grid.Col span="content" key={index}>
            <Indicator
              color="transparent"
              label={<CloseButton onClick={() => onRemoveFile(file)} />}>
              <img
                src={url}
                style={{
                  width: "100%",
                  display: "block",
                  maxWidth: "120px",
                  maxHeight: "120px",
                  objectFit: "contain",
                }}
                onLoad={() => URL.revokeObjectURL(url)}
              />
            </Indicator>
          </Grid.Col>
        );
      })}
    </Grid>
  );
};
