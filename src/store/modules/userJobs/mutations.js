export const SET_JOBS = (state, jobs) => {
	state.jobs = jobs
}

export const DELETE_JOB = (state, job) => {
	state.jobs.data.splice(state.jobs.data.indexOf(job), 1)
}

export const SET_ERRORS = (state, errors) => {
	state.errors = errors
}