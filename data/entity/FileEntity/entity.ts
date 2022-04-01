export default interface Entity {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  bucket: string;
  resizable: boolean;
  downloadable: boolean;
  filePath: string;
  filename: string;
}
