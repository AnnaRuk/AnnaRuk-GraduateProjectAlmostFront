import DialoguesDto from './DialoguesDto';

export default interface DialoguesState {
	dialogues: DialoguesDto[];
	error?: string;
}
