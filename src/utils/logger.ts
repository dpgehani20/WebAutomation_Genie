export async function executeStep(
    stepName: string,
    action: () => Promise<void>
) {
    try {
        await action();
        console.log(`${stepName} : PASS`);
    } catch (error) {
        console.log(`${stepName} : FAIL`);
        throw error; // stop test and show Playwright error
    }
}