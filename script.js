document.addEventListener('DOMContentLoaded', () => {
    // Variables globales y constantes
    const planContainer = document.getElementById('plan-de-estudios');
    const cbcIds = ['ipc', 'icse', 'quimica_cbc', 'biofisica_cbc', 'biologia_cbc', 'matematica_cbc'];
    let materiasData = {};

    // --- MÓDULO DE DATOS ---
    const dataManager = {
        init: () => {
            planDeEstudios.forEach(ciclo => {
                ciclo.materias.forEach(materia => {
                    materiasData[materia.id] = { ...materia, estado: 'pendiente', nota: null };
                });
            });
            const progresoGuardado = localStorage.getItem('progresoTedeschi');
            if (progresoGuardado) {
                const dataGuardada = JSON.parse(progresoGuardado);
                for (const id in materiasData) {
                    if (dataGuardada[id]) {
                        materiasData[id].estado = dataGuardada[id].estado;
                        materiasData[id].nota = dataGuardada[id].nota;
                    }
                }
            }
        },
        save: () => {
            localStorage.setItem('progresoTedeschi', JSON.stringify(materiasData));
        },
        getMateria: (id) => materiasData[id],
        getAll: () => Object.values(materiasData),
    };

    // --- MÓDULO DE LÓGICA DE NEGOCIO ---
    const logicManager = {
        canTakeCourse: (materiaId) => {
            const materia = dataManager.getMateria(materiaId);
            const correlativas = materia.correlativas_cursar;
            if (!correlativas || correlativas.length === 0) return true;
            return correlativas.every(req => {
                switch (req.materia) {
                    case "cbc": return cbcIds.every(id => dataManager.getMateria(id)?.estado === 'aprobada');
                    case "ciclo_biomedico_completo":
                        const idsAnio1 = planDeEstudios.find(c => c.id === 'biomedico1').materias.map(m => m.id);
                        const idsAnio2 = planDeEstudios.find(c => c.id === 'biomedico2').materias.map(m => m.id);
                        return [...idsAnio1, ...idsAnio2].every(id => dataManager.getMateria(id)?.estado === 'aprobada');
                    case "todo_aprobado":
                         const idsFinales = [
                            ...planDeEstudios.find(c => c.id === 'pfo')?.materias.map(m => m.id) || [],
                            ...planDeEstudios.find(c => c.id === 'rotaciones')?.materias.map(m => m.id) || []
                        ];
                        return dataManager.getAll().filter(m => !idsFinales.includes(m.id)).every(m => m.estado === 'aprobada');
                    default:
                        const materiaReq = dataManager.getMateria(req.materia);
                        if (!materiaReq) return false;
                        if (req.tipo === 'aprobada') return materiaReq.estado === 'aprobada';
                        if (req.tipo === 'regular') return materiaReq.estado === 'regular' || materiaReq.estado === 'aprobada';
                        return false;
                }
            });
        },
        calculateTotalSubjects: () => {
            const totalMaterias = dataManager.getAll();
            const rotacionesOpcionales = totalMaterias.filter(m => m.id.startsWith('rot_'));
            return totalMaterias.length - rotacionesOpcionales.length + 4;
        }
    };

    // --- MÓDULO DE RENDERIZADO (VISTA) ---
    const viewManager = {
        render: () => {
            planContainer.innerHTML = '';
            planDeEstudios.forEach(ciclo => {
                const columnDiv = document.createElement('div');
                columnDiv.className = 'ciclo-column';
                columnDiv.id = `col-${ciclo.id}`;
                const materiasContainer = document.createElement('div');
                materiasContainer.className = (ciclo.id === 'rotaciones') ? 'rotaciones-container' : 'materias-container';
                columnDiv.innerHTML = `<h2>${ciclo.nombre}</h2>`;
                ciclo.materias.forEach(materiaInfo => {
                    const materia = dataManager.getMateria(materiaInfo.id);
                    const isBloqueada = !logicManager.canTakeCourse(materia.id);
                    const estadoVisual = isBloqueada ? 'bloqueada' : materia.estado;
                    const materiaCard = document.createElement('div');
                    materiaCard.className = `materia-card ${estadoVisual}`;
                    materiaCard.dataset.id = materia.id;
                    let cardHTML = `<span>${materia.nombre}</span>`;
                    if (materia.estado === 'aprobada' && materia.nota) {
                        cardHTML += `<span class="materia-nota">${materia.nota}</span>`;
                    }
                    materiaCard.innerHTML = cardHTML;
                    if (isBloqueada) {
                        materiaCard.classList.add('tooltip');
                        let tooltipHTML = '<strong>Requiere para cursar:</strong><ul>';
                        materia.correlativas_cursar.forEach(req => {
                            let reqNombre = (dataManager.getMateria(req.materia)?.nombre || req.materia).replace(/\s\([A-Z]\)$/, '');
                             if (req.materia.startsWith('ciclo_') || req.materia === 'cbc' || req.materia === 'todo_aprobado') {
                                reqNombre = req.materia.replace(/_/g, ' ').toUpperCase();
                            }
                            tooltipHTML += `<li>${reqNombre} ${req.tipo === 'regular' ? 'Regular' : 'Aprobado'}</li>`;
                        });
                        tooltipHTML += '</ul>';
                        const tooltipText = document.createElement('div');
                        tooltipText.className = 'tooltip-text';
                        tooltipText.innerHTML = tooltipHTML;
                        materiaCard.appendChild(tooltipText);
                    }
                    materiasContainer.appendChild(materiaCard);
                });
                if (ciclo.id === 'rotaciones') {
                    const columnCount = 2;
                    const itemsCount = ciclo.materias.length;
                    const remainder = itemsCount % columnCount;
                    if (remainder !== 0) {
                        const placeholdersNeeded = columnCount - remainder;
                        for (let i = 0; i < placeholdersNeeded; i++) {
                            const placeholder = document.createElement('div');
                            placeholder.className = 'materia-card placeholder';
                            materiasContainer.appendChild(placeholder);
                        }
                    }
                }
                columnDiv.appendChild(materiasContainer);
                planContainer.appendChild(columnDiv);
            });
            viewManager.updateStats();
        },
        updateStats: () => {
            const todas = dataManager.getAll();
            const aprobadas = todas.filter(m => m.estado === 'aprobada');
            const regulares = todas.filter(m => m.estado === 'regular');
            const pendientes = todas.filter(m => m.estado === 'pendiente' && logicManager.canTakeCourse(m.id));
            document.getElementById('aprobadas-count').textContent = aprobadas.length;
            document.getElementById('regulares-count').textContent = regulares.length;
            document.getElementById('pendientes-count').textContent = pendientes.length;
            const notasValidas = aprobadas.map(m => m.nota).filter(n => typeof n === 'number' && n >= 4);
            const promedio = notasValidas.length > 0 ? (notasValidas.reduce((a, b) => a + b, 0) / notasValidas.length).toFixed(2) : 'N/A';
            document.getElementById('promedio-final').textContent = promedio;
            const totalCarrera = logicManager.calculateTotalSubjects();
            document.getElementById('materias-progreso').textContent = `${aprobadas.length}/${totalCarrera}`;
        }
    };

    // --- MÓDULO DE EVENTOS (CONTROLADOR) ---
    const eventManager = {
        init: () => {
            planContainer.addEventListener('click', eventManager.handleCardClick);
        },
        // CORREGIDO: Lógica de clicks optimizada
        handleCardClick: (e) => {
            const card = e.target.closest('.materia-card');
            if (!card || card.classList.contains('bloqueada') || card.classList.contains('placeholder')) return;

            const id = card.dataset.id;
            const materia = dataManager.getMateria(id);

            if (materia.estado === 'pendiente') {
                materia.estado = 'regular';
            } else if (materia.estado === 'regular') {
                if (cbcIds.includes(id)) {
                    materia.estado = 'aprobada';
                    materia.nota = null;
                } else {
                    const notaInput = prompt(`Ingresa la nota final para "${materia.nombre}":`);
                    // Si el usuario presiona "Cancelar", notaInput es null
                    if (notaInput === null) {
                        materia.estado = 'pendiente'; // Vuelve a pendiente automáticamente
                    } else {
                        const notaNum = parseInt(notaInput);
                        if (!isNaN(notaNum) && notaNum >= 1 && notaNum <= 10) {
                            materia.nota = notaNum;
                            materia.estado = notaNum >= 4 ? 'aprobada' : 'pendiente';
                        } else if (notaInput !== "") { // Evita la alerta si solo se presiona OK sin escribir nada
                            alert('Por favor, ingresa una nota válida (número del 1 al 10).');
                        }
                        // Si se presiona OK con el cuadro vacío, no hace nada y queda en Regular.
                    }
                }
            } else if (materia.estado === 'aprobada') {
                const accion = confirm(`"${materia.nombre}" está Aprobada (Nota: ${materia.nota || 'N/A'}).\n\n- OK para editar la nota.\n- Cancelar para volver a pendiente.`);
                if (accion) {
                    eventManager.promptForGrade(materia, true);
                } else {
                    materia.estado = 'pendiente';
                    materia.nota = null;
                }
            }

            dataManager.save();
            viewManager.render();
        },
        promptForGrade: (materia, isEditing) => {
            const notaInput = prompt(`Ingresa la nota para ${materia.nombre}:`, materia.nota || '');
            if (notaInput === null) return;
            const notaNum = parseInt(notaInput);
            if (!isNaN(notaNum) && notaNum >= 1 && notaNum <= 10) {
                materia.nota = notaNum;
                if (!isEditing) { 
                    materia.estado = notaNum >= 4 ? 'aprobada' : 'pendiente';
                } else if (materia.nota < 4) {
                     alert("Nota guardada. La materia sigue aprobada con el aplazo registrado.");
                }
            } else {
                alert('Por favor, ingresa una nota válida (número del 1 al 10).');
            }
        }
    };

    // --- INICIO ---
    dataManager.init();
    viewManager.render();
    eventManager.init();
});
