let correct = 0;

// Reusable function: Reset styles before marking new answer
function resetStyles(buttons) {
  buttons.forEach(btn => {
    btn.classList.remove('correct', 'error');
  });
}

// Handle answer selection
function handleQuestion(questionId, correctIndex, selectedIndex) {
  const buttons = document.querySelectorAll(`#${questionId} button`);

  // Clear previous styles
  resetStyles(buttons);

  const selectedButton = buttons[selectedIndex];

  if (selectedIndex === correctIndex) {
    selectedButton.classList.add('correct');
  } else {
    selectedButton.classList.add('error');
  }

  // Update internal score count for final summary
  // You can use Map to track latest answers if needed
}

// Setup question handlers
function setupQuestion(questionId, correctIndex) {
  const buttons = document.querySelectorAll(`#${questionId} button`);
  buttons.forEach((btn, index) => {
    btn.addEventListener('click', () => handleQuestion(questionId, correctIndex, index));
  });
}

// DOM Load Logic
document.addEventListener('DOMContentLoaded', () => {
  // Setup each question
  setupQuestion('savol_1', 1);
  setupQuestion('savol_2', 1);
  setupQuestion('savol_3', 1);
  setupQuestion('savol_4', 2);
  setupQuestion('savol_5', 2);

  // End button logic
  document.getElementById('end')?.addEventListener('click', () => {
    const modal = document.getElementById('modal');
    if (modal) {
      modal.style.display = 'flex';
      const scoreElement = document.getElementById('score');
      if (scoreElement) {
        scoreElement.textContent = `Javoblaringiz yuborilmoqda.`;
      }
    }
  });

  // Modal close
  document.getElementById('closeModal')?.addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
  });

  // Submit form
  document.getElementById('submit_form')?.addEventListener('click', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name')?.value.trim();
    const surname = document.getElementById('surname')?.value.trim();
    const submitBtn = document.getElementById('submit_form');

    // Count how many .correct classes exist (i.e., correct answers)
    const totalCorrect = document.querySelectorAll('button.correct').length;
    correct = totalCorrect;

    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbyRho-mUoErkg_S62d1qJxSMowdoqOS2roP3ajXlKlps90jlNldjEVDJrJRdE_yYOPzOw/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          surname: surname,
          correct: correct,
          date: new Date().toISOString()
        }),
        mode: "no-cors"
      });

      alert("Yuborildi! Rahmat.");
      location.reload();
    } catch (err) {
      console.error("Yuborishda xatolik:", err);
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Yuborish";
      }
    }
  });
});
