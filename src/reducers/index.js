import { ADD_PROJECT, EDIT_PROJECT, CLEAR_PROJECTS } from '../actions';
import projects_json from '../data/projects.json'

export default function projects(state = projects_json, action) {
	switch(action.type) {
		case ADD_PROJECT:
			let size = state.length;
			let newProject = action.project;
			newProject.id = size;
			let projects = [...state, newProject];
			return projects;
		case EDIT_PROJECT: 
			state[action.project.id] = action.project;
			return state;
		case CLEAR_PROJECTS: 
			projects = [];
			return projects;
		default:
			return state;
	}
}