

// Commands
export const commands = {
  'DELETE_UUTINEN': 'DELETE_UUTINEN',
  'EDIT_UUTINEN': 'EDIT_UUTINEN',
  'TOGGLE_FEATURE': 'TOGGLE_FEATURE'
}

const createOption = (name, command) => ({name, command})

// Options
// Published Uutiset
const DELETE_UUTINEN = createOption('Poista uutinen', commands.DELETE_UUTINEN)
const EDIT_UUTINEN = createOption('Muokkaa uutista', commands.EDIT_UUTINEN)
const FEATURE_UUTINEN = createOption('Merkkaa uutinen tärkeäksi', commands.TOGGLE_FEATURE)
const UN_FEATURE_UUTINEN = createOption('Poista uutisen tärkeysmerkintä', commands.TOGGLE_FEATURE)

// Options
// Drafts Uutiset
const DELETE_DRAFT = createOption('Poista luonnos', commands.DELETE_UUTINEN)
const EDIT_DRAFT = createOption('Muokkaa luonnosta', commands.EDIT_UUTINEN)


export const createPublishedOptions = (isFeatured) => {
  const options = [EDIT_UUTINEN, DELETE_UUTINEN]

  isFeatured ? options.push(UN_FEATURE_UUTINEN) : options.push(FEATURE_UUTINEN)

  return options
}

export const createDraftsOptions = () => [EDIT_DRAFT, DELETE_DRAFT]
