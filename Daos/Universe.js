const universeState = [
    [false, false, false, false, false],
    [false, false, true, false, false],
    [false, false, true, false, false],
    [false, false, true, false, false],
    [false, false, false, false, false]
];

const getUniverseState = () => {
    return universeState;
};

const saveUniverseState = (state) => {
    universeState.splice(0, universeState.length, ...state);
};

module.exports = {
    getUniverseState,
    saveUniverseState,
};
