"use strict";

window.PROTEIN_LEVELS = [
  {
    name: "Mundo 1: Fundamentos",
    questions: [
      {
        topic: "Conceptos básicos",
        question: "¿Cuál es la unidad estructural básica de las proteínas?",
        options: ["Monosacárido", "Aminoácido", "Nucleótido", "Ácido graso"],
        answer: 1,
        explanation:
          "Las proteínas están formadas por cadenas de aminoácidos."
      },
      {
        topic: "Elementos químicos",
        question:
          "¿Qué elemento distingue habitualmente a las proteínas de los carbohidratos y lípidos?",
        options: ["Nitrógeno", "Sodio", "Cloro", "Calcio"],
        answer: 0,
        explanation:
          "Los aminoácidos contienen nitrógeno en su grupo amino."
      },
      {
        topic: "Enlaces",
        question:
          "¿Cómo se llama el enlace que une dos aminoácidos en una proteína?",
        options: [
          "Enlace glucosídico",
          "Enlace fosfodiéster",
          "Enlace peptídico",
          "Enlace metálico"
        ],
        answer: 2,
        explanation:
          "El enlace peptídico se forma entre el grupo amino y el grupo carboxilo."
      },
      {
        topic: "Estructura molecular",
        question:
          "¿Qué grupos funcionales posee todo aminoácido estándar?",
        options: [
          "Amino y carboxilo",
          "Fosfato y metilo",
          "Aldehído y cetona",
          "Éter y éster"
        ],
        answer: 0,
        explanation:
          "Todo aminoácido posee un grupo amino y un grupo carboxilo."
      }
    ]
  },
  {
    name: "Mundo 2: Estructura",
    questions: [
      {
        topic: "Estructura primaria",
        question:
          "¿Qué describe la estructura primaria de una proteína?",
        options: [
          "Su ubicación celular",
          "La secuencia de aminoácidos",
          "El número de células",
          "La cantidad de glucosa"
        ],
        answer: 1,
        explanation:
          "La estructura primaria corresponde al orden exacto de sus aminoácidos."
      },
      {
        topic: "Estructura secundaria",
        question:
          "¿Cuáles son formas comunes de la estructura secundaria?",
        options: [
          "Hélice alfa y lámina beta",
          "ADN y ARN",
          "Glucosa y fructosa",
          "Núcleo y membrana"
        ],
        answer: 0,
        explanation:
          "La hélice alfa y la lámina beta se estabilizan mediante puentes de hidrógeno."
      },
      {
        topic: "Estructura terciaria",
        question:
          "La estructura terciaria corresponde principalmente a:",
        options: [
          "La forma tridimensional de una cadena polipeptídica",
          "La separación de cromosomas",
          "La síntesis de glucosa",
          "La unión de dos nucleótidos"
        ],
        answer: 0,
        explanation:
          "Es el plegamiento tridimensional global de una cadena polipeptídica."
      },
      {
        topic: "Estructura cuaternaria",
        question:
          "Una proteína tiene estructura cuaternaria cuando:",
        options: [
          "Carece de aminoácidos",
          "Posee varias subunidades polipeptídicas",
          "Solo contiene carbono",
          "Se encuentra en el núcleo"
        ],
        answer: 1,
        explanation:
          "La estructura cuaternaria aparece por la asociación de varias cadenas o subunidades."
      }
    ]
  },
  {
    name: "Mundo 3: Funciones",
    questions: [
      {
        topic: "Enzimas",
        question: "¿Cuál es la función principal de una enzima?",
        options: [
          "Aumentar la energía de activación",
          "Acelerar reacciones químicas",
          "Destruir toda la materia",
          "Almacenar información genética"
        ],
        answer: 1,
        explanation:
          "Las enzimas son catalizadores que reducen la energía de activación."
      },
      {
        topic: "Transporte",
        question:
          "¿Qué proteína transporta oxígeno en la sangre?",
        options: ["Colágeno", "Hemoglobina", "Queratina", "Insulina"],
        answer: 1,
        explanation:
          "La hemoglobina de los glóbulos rojos transporta oxígeno."
      },
      {
        topic: "Defensa",
        question:
          "¿Qué proteínas participan directamente en la defensa inmunitaria?",
        options: [
          "Anticuerpos",
          "Triglicéridos",
          "Almidones",
          "Fosfolípidos"
        ],
        answer: 0,
        explanation:
          "Los anticuerpos reconocen antígenos y ayudan a neutralizarlos."
      },
      {
        topic: "Estructural",
        question:
          "¿Cuál de las siguientes es una proteína estructural?",
        options: ["Glucógeno", "Colágeno", "Colesterol", "Celulosa"],
        answer: 1,
        explanation:
          "El colágeno brinda resistencia y soporte a diversos tejidos."
      }
    ]
  },
  {
    name: "Mundo 4: Desafío final",
    questions: [
      {
        topic: "Desnaturalización",
        question:
          "¿Qué sucede generalmente cuando una proteína se desnaturaliza?",
        options: [
          "Cambia su forma y puede perder su función",
          "Se convierte en ADN",
          "Produce más aminoácidos",
          "Duplica sus cromosomas"
        ],
        answer: 0,
        explanation:
          "El calor, el pH u otros factores pueden alterar el plegamiento y la función."
      },
      {
        topic: "Síntesis",
        question:
          "¿En qué orgánulo celular se ensamblan las proteínas?",
        options: ["Lisosoma", "Ribosoma", "Centriolo", "Vacuola"],
        answer: 1,
        explanation:
          "Los ribosomas traducen el ARN mensajero y ensamblan aminoácidos."
      },
      {
        topic: "Nutrición",
        question:
          "Un aminoácido esencial es aquel que:",
        options: [
          "El cuerpo debe obtener mediante la alimentación",
          "No forma proteínas",
          "Solo existe en plantas",
          "Siempre es tóxico"
        ],
        answer: 0,
        explanation:
          "El organismo no lo produce en cantidad suficiente y debe obtenerlo de la dieta."
      },
      {
        topic: "Aplicación",
        question:
          "Una mutación que cambia un aminoácido puede alterar una proteína porque:",
        options: [
          "Puede modificar su plegamiento y su función",
          "Elimina todos los ribosomas",
          "Convierte proteínas en lípidos",
          "Impide toda división celular"
        ],
        answer: 0,
        explanation:
          "La secuencia determina las interacciones que originan la forma y la función."
      }
    ]
  }
];
