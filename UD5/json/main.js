const jsonString=`{
    "contenedores":[
        {"tipo":"grande",
        "envases":[
            {
                "tipo":"grande ancho",
                "contenido":[
                    {"tipo":"liquido","nombre":"agua"},
                    {"tipo":"liquido","nombre":"leche"},
                    {"tipo":"liquido","nombre":"aceite"},
                    {"tipo":"liquido","nombre":"vinagre"}
                ]
            }
            {
                "tipo":"grande alto",
                "contenido":[
                    {"tipo":"liquido","nombre":"agua"},
                    {"tipo":"liquido","nombre":"leche"},
                    {"tipo":"liquido","nombre":"aceite"},
                    {"tipo":"liquido","nombre":"vinagre"}
                ]
            }
        ]
        },
        {
            "tipo":"mediano alto",
            "contenido":[
                {"tipo":"corrosivo","nombre":"lejía"},
                {"tipo":"corrosivo","nombre":"amoniaco"},
                {"tipo":"corrosivo","nombre":"jabón"},
                {"tipo":"corrosivo","nombre":"aguarrás"},
                {"tipo":"corrosivo","nombre":"alcohol"},
                {"tipo":"corrosivo","nombre":"gasolina"}
            ]
        },
    ]
}`;

let jsonObj=JSON.parse(jsonString);
console.log(jsonObj);