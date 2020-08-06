

// Commands
export const commands = {
  'DELETE_OPAS': 'DELETE_OPAS',
  'EDIT_OPAS': 'EDIT_OPAS',
  'TOGGLE_FEATURE': 'TOGGLE_FEATURE'
}

const createOption = (name, command) => ({name, command})

// Options
// Published Oppaat
const DELETE_OPAS = createOption('Poista opas', commands.DELETE_OPAS)
const EDIT_OPAS = createOption('Muokkaa opasta', commands.EDIT_OPAS)
const FEATURE_OPAS = createOption('Merkkaa opas tärkeäksi', commands.TOGGLE_FEATURE)
const UN_FEATURE_OPAS = createOption('Poista oppaan tärkeysmerkintä', commands.TOGGLE_FEATURE)

// Options
// Drafts Oppaat
const DELETE_DRAFT = createOption('Poista luonnos', commands.DELETE_OPAS)
const EDIT_DRAFT = createOption('Muokkaa luonnosta', commands.EDIT_OPAS)


export const createPublishedOptions = (isFeatured) => {
  const options = [EDIT_OPAS, DELETE_OPAS]

  isFeatured ? options.push(UN_FEATURE_OPAS) : options.push(FEATURE_OPAS)

  return options
}

export const createDraftsOptions = () => [EDIT_DRAFT, DELETE_DRAFT]
