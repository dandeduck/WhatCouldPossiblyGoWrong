export function getPromptId(question: string, sessionId: string) {
    return `${question.toLowerCase().replaceAll(' ', '-')}-${sessionId}`
}
