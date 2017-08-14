export const ADD_PROJECT = "ADD_PROJECT";
export const EDIT_PROJECT = "EDIT_PROJECT";
export const CLEAR_PROJECTS = "CLEAR_PROJECTS";

export function addProject(project) {
	return {
		type: ADD_PROJECT,
		project
	}
}

export function editProject(project) {
	return {
		type: EDIT_PROJECT,
		project
	}
}

export function clearProjects() {
	return {
		type: CLEAR_PROJECTS,
	}
}