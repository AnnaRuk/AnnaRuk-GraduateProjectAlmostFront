import Child from "./Child";

export default interface ChildrenState {
	children: Child[];
	error?: string;
}