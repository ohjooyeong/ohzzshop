const continents = [
    {
        _id: 1,
        name: "아프리카",
    },
    {
        _id: 2,
        name: "유럽",
    },
    {
        _id: 3,
        name: "아시아",
    },
    {
        _id: 4,
        name: "북아메리카",
    },
    {
        _id: 5,
        name: "남아메리카",
    },
    {
        _id: 6,
        name: "오스트레일리아",
    },
    {
        _id: 7,
        name: "남극",
    },
];

const price = [
    {
        _id: 0,
        name: "Any",
        array: [],
    },
    {
        _id: 1,
        name: "$0 ~ $199",
        array: [0, 199],
    },
    {
        _id: 2,
        name: "$200 ~ $249",
        array: [200, 249],
    },
    {
        _id: 3,
        name: "$250 ~ $279",
        array: [250, 279],
    },
    {
        _id: 4,
        name: "$280 ~ $299",
        array: [280, 299],
    },
    {
        _id: 5,
        name: "$300 ~",
        array: [300, 1500000],
    },
];

export { continents, price };
