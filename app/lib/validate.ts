const validate = (initial_state, current_state) => JSON.stringify(initial_state) !== JSON.stringify(current_state);

export default validate;
