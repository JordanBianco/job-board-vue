export const SET_JOBS = (state, jobs) => {
    state.jobs = jobs
}

export const SET_JOB = (state, job) => {
    state.job = job
}

export const TOGGLE_FILTERS = (state) => {
    state.showFilters = ! state.showFilters
}
