let wakelock;
const canWakeLock = () => 'wakeLock' in navigator;
async function lockWakeState() {
    if (!canWakeLock()) return;
    try {
        wakelock = await navigator.wakeLock.request();
        wakelock.addEventListener('release', () => {
            console.log('Screen wake state locked: ', !wakelock.released);
        });
        console.log('Screen wake state locked:', !wakelock.released);
    } catch (e) {
        console.error('Failed to lock state with reason: ', e.message)
    }
}
function releaseWakeState() {
    if (wakelock) wakelock.release();
    wakelock = null;
}

async function keepScreenAwake() {
    if (!canWakeLock()) return;
    wakelock = await navigator.wakeLock.request();
    wakeState = wakelock.released;
    console.log("The screen is locked: ", wakeState)
    if (wakeState) {
        releaseWakeState();
        console.log("Screen wake state released")
    } else {
        await lockWakeState();
    }
}