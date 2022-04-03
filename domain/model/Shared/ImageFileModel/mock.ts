export const genImageFileMockObject = () => {
  return {
    id: "11",
    width: 200,
    height: 200,
    createdAt: new Date(),
    updatedAt: new Date(),
    bucket: "bucket",
    resizable: false,
    downloadable: false,
    filePath: "https://picsum.photos/200/300",
    filename: "sampleImage",
  };
};
