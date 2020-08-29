const addIdeaModal = document.getElementById('add-modal')
const startAddIdeaButton = document.querySelector('header button')
const backdrop = document.getElementById('backdrop')
const addIdeaButton = document.querySelector('.btn--success')
const userInputs = document.querySelectorAll('input')
const addIdeaCancelButton = addIdeaButton.nextElementSibling
const entryTextSection = document.getElementById('entry-text')
const deleteIdeaModal = document.getElementById('delete-modal')
const listRoot = document.getElementById('idea-list')

const ideas = []

const updateUI = () => {
  if (ideas.length === 0) {
    entryTextSection.style.display = 'block'
  } else {
    entryTextSection.style.display = 'none'
  }
}

const clearUserInput = () => {
  for (const userInput of userInputs) {
    userInput.value = ''
  }
}

const toggleBackdropHandler = () => {
  backdrop.classList.toggle('visible')
}

const closeIdeaDeletionModal = () => {
  deleteIdeaModal.classList.remove('visible')
  toggleBackdropHandler()
}

const deleteIdeaHandler = (ideaId) => {
  let ideaIndex = 0
  for (const idea of ideas) {
    if (idea.id === ideaId) {
      break
    }
    ideaIndex++
  }
  ideas.splice(ideaIndex, 1)
  listRoot.children[ideaIndex].remove()
  closeIdeaDeletionModal()
  updateUI()
}

const startDeleteIdeaHandler = (ideaId) => {
  deleteIdeaModal.classList.add('visible')
  toggleBackdropHandler()
  const deleteIdeaCancelBtn = deleteIdeaModal.querySelector('.btn--passive')
  let deleteIdeaConfirmBtn = deleteIdeaModal.querySelector('.btn--danger')

  deleteIdeaConfirmBtn.replaceWith(deleteIdeaConfirmBtn.cloneNode(true))

  deleteIdeaConfirmBtn = document.querySelector('.btn--danger')

  deleteIdeaCancelBtn.addEventListener('click', closeIdeaDeletionModal)
  deleteIdeaCancelBtn.addEventListener('click', closeIdeaDeletionModal)
  deleteIdeaConfirmBtn.addEventListener('click', deleteIdeaHandler.bind(null, ideaId))
}

const showIdeaModal = () => {
  addIdeaModal.classList.add('visible')
  toggleBackdropHandler()
}

const closeIdeaModal = () => {
  addIdeaModal.classList.remove('visible')
  toggleBackdropHandler()
  clearUserInput()
}

const renderNewIdea = (id, idea, imageUrl, description) => {
  const newIdeaElement = document.createElement('li')
  newIdeaElement.className = 'idea-element'
  newIdeaElement.innerHTML = `
    <div class="idea-element__image">
      <img src="${imageUrl}" alt="${idea}" />
    </div>
    <div class="idea-element__info">
      <h2>${idea}</h2>
        <p>${description}</p>
    </div>
  `
  newIdeaElement.addEventListener('click', startDeleteIdeaHandler.bind(null, id))
  listRoot.appendChild(newIdeaElement)
}

const addIdeaButtonHandler = () => {
  const ideaValue = userInputs[0].value
  const imageUrlValue = userInputs[1].value
  const descriptionValue = userInputs[2].value

  if (
    ideaValue.trim() === '' ||
    imageUrlValue.trim() === '' ||
    descriptionValue.trim() === '' ||
    ideaValue == false ||
    imageUrlValue == false ||
    descriptionValue == false
  ) {
    alert('Please provide something of substance to the Collective Consciousness')
    return
  }
  const newIdea = {
    id: Math.random().toString,
    idea: ideaValue,
    image: imageUrlValue,
    description: descriptionValue
  }
  ideas.push(newIdea)
  console.log(newIdea)
  renderNewIdea(newIdea.id, newIdea.idea, newIdea.image, newIdea.description)
  closeIdeaModal()
  updateUI()
  clearUserInput()
}

const addIdeaCancelButtonHandler = () => {
  closeIdeaModal()
  clearUserInput()
}

const backdropClickHandler = () => {
  closeIdeaModal()
  clearUserInput()
  closeIdeaDeletionModal()
}

startAddIdeaButton.addEventListener('click', showIdeaModal)
backdrop.addEventListener('click', backdropClickHandler)
addIdeaButton.addEventListener('click', addIdeaButtonHandler)
addIdeaCancelButton.addEventListener('click', addIdeaCancelButtonHandler)
