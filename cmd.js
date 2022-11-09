const { PowerShell } = require("node-powershell");
var env = process.env.NODE_ENV;
const poshInstance = async () => {
    const ps = new PowerShell({
        executionPolicy: "Bypass",
        noProfile: true,
    });
    const command =
        env === "add"
        ? PowerShell.command`(Get-content .env) | %{$_ -replace 'ENV=test', '#ENV=test'} | Set-Content .env`//add
        : PowerShell.command`(Get-content .env) | %{$_ -replace '#ENV=test', 'ENV=test'} | Set-Content .env`;//remove
        await ps.invoke(command);
    ps.dispose();
};
(async () => {
    await poshInstance();
})();
