const fs = require('fs')

// Function to reconstruct text from input
function reconstructTextFromFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8').trim()
  const rows = {}
  content.split('\n').forEach((line) => {
    const match = line.match(/row=(\d+)\s+column=(\d+):\s*(\S)/)
    if (match) {
      const row = Number.parseInt(match[1], 10)
      const col = Number.parseInt(match[2], 10)
      const char = match[3]

      if (!rows[row]) rows[row] = {}

      rows[row][col] = char
    }
  })

  // Convert row objects into properly sorted text lines
  const outputLines = Object.keys(rows)
    .sort((a, b) => a - b)
    .map((rowNum) => {
      const cols = rows[rowNum]
      return Object.keys(cols)
        .sort((a, b) => a - b)
        .map((colNum) => cols[colNum])
        .join('')
    })

  return outputLines.join('\n')
}

const filePath = 'received_payload.txt' // Replace with your actual file path
const reconstructedText = reconstructTextFromFile(filePath)
console.log(reconstructedText)

// To save output to a file
fs.writeFileSync('reconstructed_output.txt', reconstructedText)
console.log('Reconstructed text saved to reconstructed_output.txt')
