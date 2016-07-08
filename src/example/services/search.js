
export const serviceSearch = () => {
  return  Promise.resolve([{facets: [
    {
      "FCT_MOVIE_TYPE": [
        {
          "code": "Long-métrage",
          "count": 29,
          "label": "Long-métrage"
        },
        {
          "code": "Télefilm",
          "count": 5,
          "label": "Télefilm"
        },
        {
          "code": "Court-métrage",
          "count": 1,
          "label": "Court-métrage"
        }
      ]
    },
    {
      "FCT_MOVIE_TITLE": [
        {
          "code": "R1",
          "count": 0,
          "label": "#"
        },
        {
          "code": "R2",
          "count": 7,
          "label": "a-f"
        },
        {
          "code": "R3",
          "count": 4,
          "label": "g-m"
        },
        {
          "code": "R4",
          "count": 20,
          "label": "n-s"
        },
        {
          "code": "R4",
          "count": 4,
          "label": "t-z"
        }
      ]
    },
    {
      "FCT_MOVIE_YEAR": [
        {
          "code": "R1",
          "count": 0,
          "label": "< années 30"
        },
        {
          "code": "R2",
          "count": 1,
          "label": "années 30"
        },
        {
          "code": "R3",
          "count": 0,
          "label": "années 40"
        },
        {
          "code": "R4",
          "count": 1,
          "label": "années 50"
        },
        {
          "code": "R5",
          "count": 0,
          "label": "années 60"
        },
        {
          "code": "R6",
          "count": 1,
          "label": "années 70"
        },
        {
          "code": "R7",
          "count": 1,
          "label": "années 80"
        },
        {
          "code": "R8",
          "count": 6,
          "label": "années 90"
        },
        {
          "code": "R9",
          "count": 23,
          "label": "années 2000"
        },
        {
          "code": "R10",
          "count": 2,
          "label": "> années 2010"
        }
      ]
    }
  ]}]);
}
