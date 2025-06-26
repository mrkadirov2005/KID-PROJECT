let correct = 0;

// Reusable functions
function disableAllButtons(parentId) {
  const buttons = document.querySelectorAll(`#${parentId} button`);
  buttons.forEach(btn => {
    btn.disabled = true;
    btn.style.cursor = 'not-allowed';
  });
}

function handleQuestion(questionId, correctIndex, selectedIndex) {
  const buttons = document.querySelectorAll(`#${questionId} button`);
  
  if (selectedIndex === correctIndex) {
    correct++;
    buttons.forEach(btn => btn.classList.add('correct'));
  } else {
    buttons[selectedIndex].classList.add('error');
    buttons[correctIndex].classList.add('correct');
  }
  disableAllButtons(questionId);
}

// Setup questions
function setupQuestion(questionId, correctIndex) {
  const buttons = document.querySelectorAll(`#${questionId} button`);
  buttons.forEach((btn, index) => {
    btn.addEventListener('click', () => handleQuestion(questionId, correctIndex, index));
  });
}

// Initialize quiz
document.addEventListener('DOMContentLoaded', () => {
  // Question setup
  setupQuestion('savol_1', 1);
  setupQuestion('savol_2', 1);
  setupQuestion('savol_3', 1);
  setupQuestion('savol_4', 2);
  setupQuestion('savol_5', 2);

  // End button
  document.getElementById('end')?.addEventListener('click', () => {
    const modal = document.getElementById('modal');
    if (modal) {
      modal.style.display = 'flex';
      const scoreElement = document.getElementById('score');
      if (scoreElement) {
        scoreElement.textContent = `Siz ${correct} ta savolga to'g'ri javob berdingiz!`;
      }
    }
  });

  // Close modal
  document.getElementById('closeModal')?.addEventListener('click', () => {
    const modal = document.getElementById('modal');
    if (modal) modal.style.display = 'none';
  });

  // Submit form
  document.getElementById('submit_form')?.addEventListener('click', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name')?.value.trim();
    const surname = document.getElementById('surname')?.value.trim();
    const submitBtn = document.getElementById('submit_form');

    

    

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
        mode:"no-cors"
      });

      const data = await response.json();
      
      if (!response.ok || data.status === 'error') {
        throw new Error(data.message || 'Server error');
      }
      
      alert("Yuborildi! Rahmat.");
      const modal = document.getElementById('modal');
      if (modal) modal.style.display = 'none';
      
      // Reset form and quiz
      const nameInput = document.getElementById('name');
      const surnameInput = document.getElementById('surname');
      if (nameInput) nameInput.value = '';
      if (surnameInput) surnameInput.value = '';
      
      // Reset quiz state
      correct = 0;
      document.querySelectorAll('button.answer-btn').forEach(btn => {
        btn.disabled = false;
        btn.classList.remove('correct', 'error');
        btn.style.cursor = 'pointer';
      });
    } catch (err) {
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Yuborish";
      }
      location.reload()

    }
  });
});