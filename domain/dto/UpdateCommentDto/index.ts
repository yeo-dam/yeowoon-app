import { PartialType } from "helper/mappedTypes";
import CreateCommentDto from "../CreateCommentDto";

export default class UpdateCommentDto extends PartialType(CreateCommentDto) {}
