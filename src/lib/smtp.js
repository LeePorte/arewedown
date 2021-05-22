module.exports = { 
    generateMessate(isPassing, watcherName){
        let subject = isPassing ? `SUCCESS: ${watcherName} is up` : `WARNING: ${watcherName} is down`,
            message = isPassing ? `${watcherName} is up` : `${watcherName} is down`
    },

    async send(to, subject, message){
        const settings = require('./settings'),
            log = require('./../lib/logger').instance(),
            smtpConfig = settings.transports.smtp,
            SMTPClient = require('smtp-client').SMTPClient,
            client = new SMTPClient({
                host: smtpConfig.server,
                secure: smtpConfig.secure,
                port: smtpConfig.port
            }),
            mailContent = 
                `From : ${smtpConfig.from}\n` +
                `Subject : ${subject}\n` +
                `To: ${to}\n` +
                `\n` +
                `${message}`

        try {
            await client.connect()
            await client.greet({hostname: smtpConfig.server })
            await client.authPlain({username: smtpConfig.user, password: smtpConfig.pass })
            await client.mail({from: smtpConfig.from })
            await client.rcpt({ to })
            await client.data(mailContent)
            await client.quit()

            return {
                result : 'mail sent.'
            }
        } catch (ex){
            log.error(ex)
        }
    },
    
    async ensureSettingsOrExit(){
        const settings = require('./settings'),
            log = require('./../lib/logger').instance(),
            smtpConfig = settings.transports.smtp,
            SMTPClient = require('smtp-client').SMTPClient,
            client = new SMTPClient({
                host: smtpConfig.server,
                secure: smtpConfig.secure,
                port: smtpConfig.port
            })
            
        log.info(`Confirming smtp settings by connecting to "${smtpConfig.server}".`)

        try {
            await client.connect()
            await client.greet({hostname: smtpConfig.server })
            await client.authPlain({username: smtpConfig.user, password: smtpConfig.pass })
            await client.quit()
            
            console.log('smtp connection test succeeded.')
        } catch (ex){
            throw { text : 'smtp connection test failed. Please confirm smtp settings are valid.', ex }
        }        
    }
}