// Define the prompt template for generating video ad scripts
export const GENERATE_SCRIPT_PROMPT = `
Topic: {topic}
Generate exactly 3 different 30-second video scripts based on the topic.
 
Return only a JSON array in the following format:
 
[
  { "content": "First script here" },
  { "content": "Second script here" },
  { "content": "Third script here" }
]
`;