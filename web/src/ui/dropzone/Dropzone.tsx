import { Box, Group, Input, InputWrapperProps, Text } from "@mantine/core";
import {
  Dropzone as MantineDropzone,
  DropzoneProps as MantineDropzoneProps,
  FileWithPath,
} from "@mantine/dropzone";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { ErrorCode, FileRejection } from "react-dropzone";
import { DropzoneStatus } from "./DropzoneStatus";
import { ImagePreview } from "./ImagePreview";

type DropzoneProps = {
  onFiles: (files: FileWithPath[]) => void;
  dropzoneProps: Omit<MantineDropzoneProps, "onDrop" | "children">;
} & Omit<InputWrapperProps, "children">;

export type DropzoneRef = {
  reset: () => void;
};

export const Dropzone = forwardRef<DropzoneRef, DropzoneProps>(
  ({ style, onFiles, dropzoneProps, ...inputProps }, ref) => {
    const [files, setFiles] = useState<FileWithPath[]>([]);
    const [errors, setErrors] = useState<ErrorCode[]>([]);

    const getErrorMessage = (code: ErrorCode) => {
      switch (code) {
        case ErrorCode.TooManyFiles:
          return `Trop de fichiers ont été téléversés. (Maximum ${dropzoneProps.maxFiles})`;
        case ErrorCode.FileInvalidType:
          return `Le fichier n'est pas du bon type. Types acceptés: [${dropzoneProps.accept?.toString()}]`;
        case ErrorCode.FileTooLarge:
          return "Le fichier est trop lourd.";
        default:
          return "Impossible de téléverser le fichier";
      }
    };

    const handleNewFiles = (newFiles: FileWithPath[]) => {
      setFiles(previousFiles => [...previousFiles, ...newFiles]);
    };

    const handleRemoveFile = (file: FileWithPath) => {
      setFiles(previousFiles => previousFiles.filter(f => f !== file));
    };

    const handleErrors = (rejectedFiles: FileRejection[]) => {
      setErrors([
        ...new Set(
          rejectedFiles.reduce(
            (allErrorCodes, rejectedFile) => [
              ...allErrorCodes,
              ...rejectedFile.errors.map(error => error.code as ErrorCode),
            ],
            [] as ErrorCode[],
          ),
        ),
      ]);
    };

    useEffect(() => onFiles(files), [files]);

    useImperativeHandle(ref, () => ({
      reset: () => setFiles([]),
    }));

    return (
      <Box style={style}>
        <Input.Wrapper
          {...inputProps}
          error={[inputProps.error, ...errors.map(getErrorMessage)].map(
            (error, index) => (
              <Text key={index}>{error}</Text>
            ),
          )}>
          <MantineDropzone
            {...dropzoneProps}
            disabled={dropzoneProps.maxFiles === files.length}
            maxFiles={
              dropzoneProps.maxFiles !== undefined
                ? dropzoneProps.maxFiles - files.length
                : undefined
            }
            onDrop={handleNewFiles}
            onReject={handleErrors}
            mb={inputProps.error || errors.length > 0 ? "5px" : undefined}>
            <Group
              spacing="md"
              position="center"
              style={{ minHeight: 0, pointerEvents: "none" }}>
              <MantineDropzone.Accept>
                <DropzoneStatus
                  icon="upload_file"
                  message="Téléverser le fichier"
                />
              </MantineDropzone.Accept>
              <MantineDropzone.Reject>
                <DropzoneStatus
                  icon="error"
                  message="Le fichier saisi est invalide"
                />
              </MantineDropzone.Reject>
              <MantineDropzone.Idle>
                <DropzoneStatus
                  icon="image"
                  message="Insérer le logo du partenaire ici"
                />
              </MantineDropzone.Idle>
            </Group>
          </MantineDropzone>
        </Input.Wrapper>

        <ImagePreview files={files} onRemoveFile={handleRemoveFile} />
      </Box>
    );
  },
);
