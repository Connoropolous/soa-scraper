miro.onReady(() => {
  const uncertainIcon =`
  <circle cx="12" cy="12" r="10" fill="#f24726" fill-rule="evenodd" stroke="currentColor" stroke-width="2.5"/>
  `

  miro.initialize({
    extensionPoints: {
      bottomBar: {
        title: 'ᴀᴄᴏʀɴ: Set selected as uncertain',
        svgIcon: uncertainIcon,
        positionPriority: 996,
        onClick: uncertainSelected
      }
    }
  })
})


async function uncertainSelected() {
  // gets the selected widgets on the board, returns an array
  let selection = await miro.board.selection.get()

  // validate that we can proceed with the selected item
  if (!validateSelection(selection)) return

  let root = selection[0]

  miro.board.widgets.shapes.update(root.id, { style: { 
    backgroundColor: uncertainRed,
    borderColor: "#000000",
    borderWidth: 2
  }})
}

const uncertainRed = "#f24726"
const incompleteYellow = "#fac710"
const completeGreen = "#8fd14f"
const smallGreen = "#0ca789"
const timeTeal = "#12cdd4"

function validateSelection(selection) {
  // validate only one selection
  if (selection.length > 1) {
    miro.showErrorNotification('You must only have one node selected')
    return false
  } else if (selection.length === 0) {
    miro.showErrorNotification('You must have at least one node selected')
    return false
  } else if (selection[0].type !== "SHAPE") {
    miro.showErrorNotification('The selected element must be a node')
    return false
  } else {
    return true
  }
}
