"use strict";

const TEACHER_EMAIL = "ayazocristian.faro@gmail.com";
const MAX_LIVES = 3;

const screens = {
  start: document.getElementById("start-screen"),
  game: document.getElementById("game-screen"),
  result: document.getElementById("result-screen")
};

const studentForm = document.getElementById("student-form");
const studentNameInput = document.getElementById("student-name");
const studentCourseInput = document.getElementById("student-course");

const playerLabel = document.getElementById("player-label");
const levelLabel = document.getElementById("level-label");
const timerLabel = document.getElementById("timer-label");
const livesLabel = document.getElementById("lives-label");
const levelTitle = document.getElementById("level-title");
const questionCounter = document.getElementById("question-counter");
const progressTrack = document.querySelector(".progress-track");
const progressFill = document.getElementById("progress-fill");
const topicLabel = document.getElementById("topic-label");
const questionText = document.getElementById("question-text");
const answers = document.getElementById("answers");
const feedback = document.getElementById("feedback");
const character = document.getElementById("character");

const warningModal = document.getElementById("warning-modal");
const warningButton = document.getElementById("warning-button");

const finalGrade = document.getElementById("final-grade");
const gradeCircle = document.getElementById("grade-circle");
const resultMessage = document.getElementById("result-message");
const resultStudent = document.getElementById("result-student");
const resultCourse = document.getElementById("result-course");
const resultCorrect = document.getElementById("result-correct");
const resultTime = document.getElementById("result-time");
const resultLives = document.getElementById("result-lives");
const resultViolations = document.getElementById("result-violations");
const emailButton = document.getElementById("email-button");
const copyButton = document.getElementById("copy-button");
const restartButton = document.getElementById("restart-button");
const emailHelp = document.getElementById("email-help");

let state = createInitialState();
let timerId = null;

function createInitialState() {
  return {
    active: false,
    finished: false,
    studentName: "",
    studentCourse: "",
    levelIndex: 0,
    questionIndex: 0,
    lives: MAX_LIVES,
    correct: 0,
    answered: 0,
    violations: 0,
    startTime: 0,
    elapsedSeconds: 0,
    forcedGrade: null,
    finishingReason: "completed",
    locked: false,
    shuffledLevels: []
  };
}

function showScreen(name) {
  Object.values(screens).forEach((screen) => {
    screen.classList.remove("active");
  });
  screens[name].classList.add("active");
  window.scrollTo({ top: 0, behavior: "auto" });
}

function shuffle(array) {
  const result = [...array];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[randomIndex]] =
      [result[randomIndex], result[index]];
  }

  return result;
}

function prepareLevels() {
  return window.PROTEIN_LEVELS.map((level) => ({
    ...level,
    questions: shuffle(level.questions).map((question) => {
      const choices = question.options.map((text, originalIndex) => ({
        text,
        correct: originalIndex === question.answer
      }));

      return {
        ...question,
        choices: shuffle(choices)
      };
    })
  }));
}

function totalQuestions() {
  return state.shuffledLevels.reduce(
    (total, level) => total + level.questions.length,
    0
  );
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function updateElapsedTime() {
  if (!state.startTime) {
    return;
  }

  state.elapsedSeconds = Math.floor(
    (Date.now() - state.startTime) / 1000
  );

  timerLabel.textContent = formatTime(state.elapsedSeconds);
}

async function requestFullscreen() {
  const root = document.documentElement;

  try {
    if (!document.fullscreenElement && root.requestFullscreen) {
      await root.requestFullscreen();
    }
  } catch (error) {
    console.info("El navegador no permitió activar pantalla completa.");
  }
}

function startGame(event) {
  event.preventDefault();

  if (!studentForm.reportValidity()) {
    return;
  }

  state = createInitialState();
  state.studentName = studentNameInput.value.trim();
  state.studentCourse = studentCourseInput.value.trim();
  state.shuffledLevels = prepareLevels();
  state.active = true;
  state.startTime = Date.now();

  playerLabel.textContent = state.studentName;
  showScreen("game");
  updateStatus();
  renderQuestion();
  requestFullscreen();

  timerId = window.setInterval(updateElapsedTime, 1000);
}

function updateStatus() {
  levelLabel.textContent =
    `${state.levelIndex + 1}/${state.shuffledLevels.length}`;

  livesLabel.textContent =
    `${"♥ ".repeat(state.lives)}${"♡ ".repeat(MAX_LIVES - state.lives)}`.trim();

  livesLabel.setAttribute(
    "aria-label",
    `${state.lives} de ${MAX_LIVES} vidas`
  );

  const progress = totalQuestions()
    ? Math.round((state.answered / totalQuestions()) * 100)
    : 0;

  progressFill.style.width = `${progress}%`;
  progressTrack.setAttribute("aria-valuenow", String(progress));

  const movement = Math.min(78, 4 + progress * 0.74);
  character.style.left = `${movement}%`;
}

function renderQuestion() {
  const level = state.shuffledLevels[state.levelIndex];
  const question = level.questions[state.questionIndex];

  state.locked = false;
  feedback.textContent = "";
  feedback.className = "feedback";

  levelTitle.textContent = level.name;
  questionCounter.textContent =
    `Pregunta ${state.questionIndex + 1} de ${level.questions.length}`;
  topicLabel.textContent = question.topic;
  questionText.textContent = question.question;
  answers.replaceChildren();

  question.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-button";
    button.dataset.correct = String(choice.correct);

    const letter = document.createElement("span");
    letter.className = "answer-letter";
    letter.textContent = String.fromCharCode(65 + index);

    const label = document.createElement("span");
    label.textContent = choice.text;

    button.append(letter, label);
    button.addEventListener("click", () => answerQuestion(button, question));
    answers.appendChild(button);
  });

  updateStatus();
}

function answerQuestion(selectedButton, question) {
  if (state.locked || !state.active) {
    return;
  }

  state.locked = true;
  state.answered += 1;

  const isCorrect = selectedButton.dataset.correct === "true";
  const buttons = [...answers.querySelectorAll(".answer-button")];

  buttons.forEach((button) => {
    button.disabled = true;

    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
  });

  if (isCorrect) {
    state.correct += 1;
    feedback.textContent = `¡Correcto! ${question.explanation}`;
    feedback.classList.add("success");
    character.classList.add("jump");
  } else {
    state.lives -= 1;
    selectedButton.classList.add("incorrect");
    feedback.textContent = `Respuesta incorrecta. ${question.explanation}`;
    feedback.classList.add("error");
    document.body.classList.add("damage");
  }

  updateStatus();

  window.setTimeout(() => {
    character.classList.remove("jump");
    document.body.classList.remove("damage");

    if (state.lives <= 0) {
      state.finishingReason = "no-lives";
      finishGame();
      return;
    }

    goToNextQuestion();
  }, 1700);
}

function goToNextQuestion() {
  const currentLevel = state.shuffledLevels[state.levelIndex];

  if (state.questionIndex < currentLevel.questions.length - 1) {
    state.questionIndex += 1;
    renderQuestion();
    return;
  }

  if (state.levelIndex < state.shuffledLevels.length - 1) {
    state.levelIndex += 1;
    state.questionIndex = 0;
    renderQuestion();
    return;
  }

  state.finishingReason = "completed";
  finishGame();
}

function calculateGrade() {
  if (state.forcedGrade !== null) {
    return state.forcedGrade;
  }

  const total = totalQuestions();

  if (!total) {
    return 1;
  }

  const accuracy = state.correct / total;
  let grade = 1 + accuracy * 3.6;

  if (
    state.finishingReason === "completed" &&
    state.lives === MAX_LIVES &&
    state.correct === total
  ) {
    grade = 5;
  } else if (state.lives > 0) {
    grade += 0.1 * (state.lives / MAX_LIVES);
  }

  return Math.max(1, Math.min(5, Number(grade.toFixed(1))));
}

function getResultMessage(grade) {
  if (state.finishingReason === "tab-violation") {
    return "La prueba terminó por salir de la pestaña por segunda vez.";
  }

  if (state.finishingReason === "no-lives") {
    return "Perdiste las tres vidas. Repasa los temas e inténtalo de nuevo.";
  }

  if (grade === 5) {
    return "¡Desempeño perfecto! Conservaste todas las vidas y acertaste todas las preguntas.";
  }

  if (grade >= 4) {
    return "Muy buen desempeño. Demostraste un dominio sólido del tema.";
  }

  if (grade >= 3) {
    return "Superaste el reto. Conviene reforzar algunos conceptos.";
  }

  return "Debes reforzar los conceptos de estructura y función de las proteínas.";
}

function finishGame() {
  if (state.finished) {
    return;
  }

  state.active = false;
  state.finished = true;
  updateElapsedTime();
  window.clearInterval(timerId);
  timerId = null;

  const grade = calculateGrade();

  finalGrade.textContent = grade.toFixed(1);
  resultMessage.textContent = getResultMessage(grade);
  resultStudent.textContent = state.studentName;
  resultCourse.textContent = state.studentCourse;
  resultCorrect.textContent = `${state.correct}/${totalQuestions()}`;
  resultTime.textContent = formatTime(state.elapsedSeconds);
  resultLives.textContent = `${state.lives}/${MAX_LIVES}`;
  resultViolations.textContent = String(state.violations);

  gradeCircle.classList.toggle("low-grade", grade < 3);
  showScreen("result");

  try {
    localStorage.setItem("proteinQuestLastResult", JSON.stringify({
      studentName: state.studentName,
      studentCourse: state.studentCourse,
      grade: grade.toFixed(1),
      correct: state.correct,
      total: totalQuestions(),
      elapsedSeconds: state.elapsedSeconds,
      lives: state.lives,
      violations: state.violations,
      date: new Date().toISOString()
    }));
  } catch (error) {
    console.info("No se pudo guardar una copia local del resultado.");
  }
}

function buildResultText() {
  const grade = calculateGrade();

  return [
    "RESULTADO - PROTEIN QUEST",
    "",
    `Estudiante: ${state.studentName}`,
    `Curso: ${state.studentCourse}`,
    `Calificación: ${grade.toFixed(1)}`,
    `Aciertos: ${state.correct} de ${totalQuestions()}`,
    `Tiempo: ${formatTime(state.elapsedSeconds)}`,
    `Vidas restantes: ${state.lives} de ${MAX_LIVES}`,
    `Cambios de pestaña: ${state.violations}`,
    `Finalización: ${resultMessage.textContent}`,
    `Fecha local: ${new Date().toLocaleString("es-CO")}`
  ].join("\n");
}

function sendResultByEmail() {
  const grade = calculateGrade().toFixed(1);
  const subject =
    `Resultado Protein Quest - ${state.studentName} - ${state.studentCourse}`;
  const body = buildResultText();

  const mailto =
    `mailto:${TEACHER_EMAIL}` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;

  emailHelp.textContent =
    "Se abrió el correo con el resultado. Comprueba el destinatario y pulsa “Enviar”.";

  window.location.href = mailto;
}

async function copyResult() {
  const text = buildResultText();

  try {
    await navigator.clipboard.writeText(text);
    copyButton.textContent = "Resultado copiado";
  } catch (error) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    textArea.remove();
    copyButton.textContent = "Resultado copiado";
  }

  window.setTimeout(() => {
    copyButton.textContent = "Copiar resultado";
  }, 2000);
}

function registerTabViolation() {
  if (!state.active || state.finished || !document.hidden) {
    return;
  }

  state.violations += 1;

  if (state.violations === 1) {
    window.clearInterval(timerId);
    timerId = null;
    warningModal.hidden = false;
    return;
  }

  state.forcedGrade = 1;
  state.finishingReason = "tab-violation";
  warningModal.hidden = true;
  finishGame();
}

function resumeAfterWarning() {
  warningModal.hidden = true;

  if (state.active && !timerId) {
    timerId = window.setInterval(updateElapsedTime, 1000);
  }

  requestFullscreen();
}

function restartGame() {
  state = createInitialState();
  studentForm.reset();
  warningModal.hidden = true;
  finalGrade.textContent = "0.0";
  gradeCircle.classList.remove("low-grade");
  emailHelp.textContent =
    "El botón abrirá tu aplicación de correo con el resultado preparado. Debes pulsar “Enviar” para completar el proceso.";
  showScreen("start");
  studentNameInput.focus();
}

studentForm.addEventListener("submit", startGame);
warningButton.addEventListener("click", resumeAfterWarning);
emailButton.addEventListener("click", sendResultByEmail);
copyButton.addEventListener("click", copyResult);
restartButton.addEventListener("click", restartGame);
document.addEventListener("visibilitychange", registerTabViolation);

window.addEventListener("beforeunload", (event) => {
  if (!state.active || state.finished) {
    return;
  }

  event.preventDefault();
  event.returnValue = "";
});

window.addEventListener("pagehide", () => {
  if (state.active && !state.finished) {
    try {
      sessionStorage.setItem("proteinQuestInterrupted", "true");
    } catch (error) {
      console.info("No se pudo registrar la interrupción.");
    }
  }
});
