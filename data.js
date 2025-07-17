const planDeEstudios = [
    {
        id: "cbc",
        nombre: "CBC",
        materias: [
            { id: "ipc", nombre: "Int. Pensamiento Científico (C)", correlativas_cursar: [] },
            { id: "icse", nombre: "Int. Con. Sociedad y Estado (C)", correlativas_cursar: [] },
            { id: "quimica_cbc", nombre: "Química (C)", correlativas_cursar: [] },
            { id: "biofisica_cbc", nombre: "Biofísica (C)", correlativas_cursar: [] },
            { id: "biologia_cbc", nombre: "Biología Celular (C)", correlativas_cursar: [] },
            { id: "matematica_cbc", nombre: "Matemática (C)", correlativas_cursar: [] }
        ]
    },
    {
        id: "biomedico1",
        nombre: "1ER AÑO Y MATERIAS LIBRES",
        materias: [
            { id: "anatomia", nombre: "Anatomía (A)", correlativas_cursar: [{materia: "cbc", tipo: "aprobada"}] },
            { id: "histo_bloque", nombre: "Histología - Biología Celular - Embriología - Genética (A)", correlativas_cursar: [{materia: "cbc", tipo: "aprobada"}] },
            { id: "salud_mental", nombre: "Salud Mental (A)", correlativas_cursar: [{materia: "cbc", tipo: "aprobada"}] },
            { id: "salud_publica", nombre: "Salud Pública (C)", correlativas_cursar: [{materia: "cbc", tipo: "aprobada"}] },
            { id: "bioetica", nombre: "Bioética (C)", correlativas_cursar: [{materia: "cbc", tipo: "aprobada"}] },
            { id: "ingles", nombre: "Inglés Técnico", correlativas_cursar: [{materia: "cbc", tipo: "aprobada"}] },
        ]
    },
    {
        id: "biomedico2",
        nombre: "CICLO BIOMÉDICO - 2DO AÑO",
        materias: [
            { id: "fisio", nombre: "Fisiología y Biofísica (A)", correlativas_cursar: [{materia: "histo_bloque", tipo: "regular"}, {materia: "anatomia", tipo: "aprobada"}] },
            { id: "bioquimica", nombre: "Bioquímica (A)", correlativas_cursar: [{materia: "histo_bloque", tipo: "regular"}] },
            { id: "inmuno", nombre: "Inmunología (C)", correlativas_cursar: [{materia: "histo_bloque", tipo: "regular"}] },
            { id: "micro", nombre: "Microbiología (C)", correlativas_cursar: [{materia: "inmuno", tipo: "regular"}, {materia: "bioquimica", tipo: "regular"}] }
        ]
    },
    {
        id: "ciclo_clinico",
        nombre: "CICLO CLÍNICO",
        materias: [
            { id: "medicina_a", nombre: "Medicina A (C)", correlativas_cursar: [{materia: "ciclo_biomedico_completo", tipo: "aprobada"}] },
            { id: "patologia", nombre: "Patología (C)", correlativas_cursar: [{materia: "ciclo_biomedico_completo", tipo: "aprobada"}] },
            { id: "farma1", nombre: "Farmacología I (C)", correlativas_cursar: [{materia: "ciclo_biomedico_completo", tipo: "aprobada"}] },
            { id: "med_legal", nombre: "Medicina Legal y Deontología Médica (C)", correlativas_cursar: [{materia: "ciclo_biomedico_completo", tipo: "aprobada"}] },
            { id: "toxico", nombre: "Toxicología (C)", correlativas_cursar: [{materia: "farma1", tipo: "aprobada"}] },
            { id: "farma2", nombre: "Farmacología II (C)", correlativas_cursar: [{materia: "farma1", tipo: "aprobada"}] },
        ]
    },
    {
        id: "clinicas",
        nombre: "CLÍNICAS",
        materias: [
            { id: "medicina_b", nombre: "Medicina B", correlativas_cursar: [{materia: "medicina_a", tipo: "aprobada"}, {materia: "patologia", tipo: "aprobada"}] },
            { id: "nutricion", nombre: "Nutrición", correlativas_cursar: [{materia: "medicina_a", tipo: "aprobada"}, {materia: "patologia", tipo: "aprobada"}] },
            { id: "dermatologia", nombre: "Dermatología", correlativas_cursar: [{materia: "medicina_a", tipo: "aprobada"}, {materia: "patologia", tipo: "aprobada"}] },
            { id: "infectologia", nombre: "Infectología", correlativas_cursar: [{materia: "medicina_a", tipo: "aprobada"}, {materia: "patologia", tipo: "aprobada"}] },
            { id: "neumonologia", nombre: "Neumonología", correlativas_cursar: [{materia: "medicina_a", tipo: "aprobada"}, {materia: "patologia", tipo: "aprobada"}] },
            { id: "neurologia", nombre: "Neurología", correlativas_cursar: [{materia: "medicina_a", tipo: "aprobada"}, {materia: "patologia", tipo: "aprobada"}] },
            { id: "imagenes", nombre: "Diagnóstico por Imágenes", correlativas_cursar: [{materia: "medicina_a", tipo: "aprobada"}, {materia: "patologia", tipo: "aprobada"}] },
            { id: "psiquiatria", nombre: "Psiquiatría", correlativas_cursar: [{materia: "medicina_a", tipo: "aprobada"}, {materia: "patologia", tipo: "aprobada"}, {materia: "salud_mental", tipo: "aprobada"}] },
        ]
    },
    {
        id: "quirurgicas",
        nombre: "QUIRÚRGICAS",
        materias: [
            { id: "pediatria", nombre: "Pediatría", correlativas_cursar: [{materia: "medicina_a", tipo: "aprobada"}, {materia: "patologia", tipo: "aprobada"}] },
            { id: "obstetricia", nombre: "Obstetricia", correlativas_cursar: [{materia: "medicina_a", tipo: "aprobada"}, {materia: "patologia", tipo: "aprobada"}] },
            { id: "ginecologia", nombre: "Ginecología", correlativas_cursar: [{materia: "medicina_a", tipo: "aprobada"}, {materia: "patologia", tipo: "aprobada"}] },
            { id: "cirugia", nombre: "Cirugía general", correlativas_cursar: [{materia: "medicina_a", tipo: "aprobada"}, {materia: "patologia", tipo: "aprobada"}] },
            { id: "urologia", nombre: "Urología", correlativas_cursar: [{materia: "medicina_a", tipo: "aprobada"}, {materia: "patologia", tipo: "aprobada"}] },
            { id: "ortopedia", nombre: "Ortopedia - Traumatología", correlativas_cursar: [{materia: "medicina_a", tipo: "aprobada"}, {materia: "patologia", tipo: "aprobada"}] },
            { id: "oftalmologia", nombre: "Oftalmología", correlativas_cursar: [{materia: "medicina_a", tipo: "aprobada"}, {materia: "patologia", tipo: "aprobada"}] },
            { id: "otorrino", nombre: "Otorrinolaringología", correlativas_cursar: [{materia: "medicina_a", tipo: "aprobada"}, {materia: "patologia", tipo: "aprobada"}] },
            { id: "neurocirugia", nombre: "Neurocirugía", correlativas_cursar: [{materia: "medicina_a", tipo: "aprobada"}, {materia: "patologia", tipo: "aprobada"}] },
        ]
    },
    {
        id: "pfo",
        nombre: "PRÁCTICA FINAL OBLIGATORIA (PFO)",
        materias: [
            { id: "med_familiar", nombre: "Medicina Familiar", correlativas_cursar: [{materia: "todo_aprobado", tipo: "aprobada"}] },
            { id: "emergentologia", nombre: "Emergentología", correlativas_cursar: [{materia: "todo_aprobado", tipo: "aprobada"}] },
            { id: "practicas_com", nombre: "Prácticas Comunitarias", correlativas_cursar: [{materia: "todo_aprobado", tipo: "aprobada"}] },
        ]
    },
    {   
        id: "rotaciones",
        nombre: "ROTACIONES (Elegir 4)",
        materias: [
            { id: "rot_dermatologia", nombre: "Dermatología", correlativas_cursar: [{materia: "todo_aprobado", tipo: "aprobada"}] },
            { id: "rot_psiquiatria", nombre: "Psiquiatría", correlativas_cursar: [{materia: "todo_aprobado", tipo: "aprobada"}] },
            { id: "rot_pediatria", nombre: "Pediatría", correlativas_cursar: [{materia: "todo_aprobado", tipo: "aprobada"}] },
            { id: "rot_neurologia", nombre: "Neurología", correlativas_cursar: [{materia: "todo_aprobado", tipo: "aprobada"}] },
            { id: "rot_oftalmologia", nombre: "Oftalmología", correlativas_cursar: [{materia: "todo_aprobado", tipo: "aprobada"}] },
            { id: "rot_gastroenterologia", nombre: "Gastroenterología", correlativas_cursar: [{materia: "todo_aprobado", tipo: "aprobada"}] },
            { id: "rot_cirugia_general", nombre: "Cirugía General", correlativas_cursar: [{materia: "todo_aprobado", tipo: "aprobada"}] },
            { id: "rot_toxicologia", nombre: "Toxicología", correlativas_cursar: [{materia: "todo_aprobado", tipo: "aprobada"}] },
            { id: "rot_neumonologia", nombre: "Neumonología", correlativas_cursar: [{materia: "todo_aprobado", tipo: "aprobada"}] },
            { id: "rot_traumatologia", nombre: "Traumatología", correlativas_cursar: [{materia: "todo_aprobado", tipo: "aprobada"}] },
            { id: "rot_geriatria", nombre: "Geriatría", correlativas_cursar: [{materia: "todo_aprobado", tipo: "aprobada"}] },
            { id: "rot_endocrinologia", nombre: "Endocrinología", correlativas_cursar: [{materia: "todo_aprobado", tipo: "aprobada"}] },
            { id: "rot_cardiologia", nombre: "Cardiología", correlativas_cursar: [{materia: "todo_aprobado", tipo: "aprobada"}] },
            { id: "rot_tocoginecologia", nombre: "Tocoginecología", correlativas_cursar: [{materia: "todo_aprobado", tipo: "aprobada"}] },
            { id: "rot_infectologia", nombre: "Infectología", correlativas_cursar: [{materia: "todo_aprobado", tipo: "aprobada"}] },
            { id: "rot_terapia_intensiva", nombre: "Terapia Intensiva", correlativas_cursar: [{materia: "todo_aprobado", tipo: "aprobada"}] },
            { id: "rot_otorrinolaringologia", nombre: "Otorrinolaringología", correlativas_cursar: [{materia: "todo_aprobado", tipo: "aprobada"}] },
            { id: "rot_patologia", nombre: "Patología", correlativas_cursar: [{materia: "todo_aprobado", tipo: "aprobada"}] },
            { id: "rot_oncologia", nombre: "Oncología", correlativas_cursar: [{materia: "todo_aprobado", tipo: "aprobada"}] },
            { id: "rot_urologia", nombre: "Urología", correlativas_cursar: [{materia: "todo_aprobado", tipo: "aprobada"}] },
            { id: "rot_clinica_medica", nombre: "Clínica Médica", correlativas_cursar: [{materia: "todo_aprobado", tipo: "aprobada"}] },
            { id: "rot_hematologia", nombre: "Hematología", correlativas_cursar: [{materia: "todo_aprobado", tipo: "aprobada"}] },
        ]
    }
];
