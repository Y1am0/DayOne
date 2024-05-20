export function calculateDisciplineDays(habitLogs) {
    if (habitLogs.length === 0) return 0;

    let firstLogDate = new Date(habitLogs[0].date);
    let today = new Date();


    firstLogDate = new Date(firstLogDate.toISOString().split('T')[0]);
    today = new Date(today.toISOString().split('T')[0]);


    const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
    const daysPassed = Math.round((today - firstLogDate) / DAY_IN_MS);
    console.log('Days Passed:', daysPassed);

    let completedDays = 0;
    let plannedSkippedDays = 0;

    habitLogs.forEach(log => {
        if (log.status === 'COMPLETE') {
            completedDays += 1;
        } else if (log.status === 'PLAN-SKIPPED') {
            plannedSkippedDays += 1;
        }
    });

    const likelihood = (completedDays + 0.5 * plannedSkippedDays) / daysPassed * 100;
    return Math.max(0, Math.min(likelihood, 100));
}
