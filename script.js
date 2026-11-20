
let currentModule = "message";

const modules = {
    message: {
        title: "Scam Message Checker",
        description: "Paste a suspicious SMS or WhatsApp message."
    },
    voice: {
        title: "Voice Scam Awareness",
        description: "Review warning signs in a suspicious voice-call situation."
    },
    job: {
        title: "Job & Website Checker",
        description: "Enter a job offer or website URL for a basic safety review."
    },
    link: {
        title: "Suspicious Link Checker",
        description: "Enter a website URL to check for suspicious warning signs."
    },
    upi: {
        title: "UPI Safety Assistant",
        description: "Enter suspicious payment instructions."
    },
    identity: {
        title: "Identity Misuse Support",
        description: "Describe a suspected fake profile or identity misuse."
    }
};

function openModule(module) {
    currentModule = module;

    document.getElementById("moduleTitle").innerText =
        modules[module].title;

    document.getElementById("moduleDescription").innerText =
        modules[module].description;

    document.getElementById("userInput").value = "";
    document.getElementById("result").innerHTML = "";
    document.getElementById("tamilResult").innerHTML = "";

    document.getElementById("checker").scrollIntoView({
        behavior: "smooth"
    });
}

function checkSafety() {

    let input = document.getElementById("userInput").value
        .trim().toLowerCase();

    let result = document.getElementById("result");
    let tamilResult = document.getElementById("tamilResult");

    if (input === "") {
        result.innerHTML = "Please enter some information first.";
        tamilResult.innerHTML =
            "தயவுசெய்து முதலில் தகவலை உள்ளிடவும்.";
        return;
    }

    // LINK CHECKER
    if (currentModule === "link") {

        let linkWarnings = [];

        if (input.includes("bit.ly") ||
            input.includes("tinyurl.com") ||
            input.includes("t.co")) {
            linkWarnings.push("Shortened website link");
        }

        if (input.startsWith("http://")) {
            linkWarnings.push("Unencrypted HTTP connection");
        }

        if (input.includes("@")) {
            linkWarnings.push("Unusual @ symbol in link");
        }

        let score = Math.min(linkWarnings.length * 30, 100);

        let message = "<h3>CYBERSHIELD LINK REPORT</h3>";
        message += "Risk Score: " + score + "/100<br>";

        if (linkWarnings.length > 0) {
            message += "<br><b>Warning signs found:</b><br>";
            message += linkWarnings.join("<br>");
        } else {
            message += "<br>No matching warning signs found.";
        }

        message += "<br><br>This basic checker cannot confirm whether a website is safe.";

        result.innerHTML = message;

        tamilResult.innerHTML =
            "<h3>இணையதள இணைப்பு பாதுகாப்பு</h3>" +
            "சந்தேகமான இணைப்புகளைத் திறக்க வேண்டாம். " +
            "இணையதள முகவரியைச் சரிபார்த்து, தனிப்பட்ட தகவல்களைப் பகிர வேண்டாம்.";

        return;
    }

    // JOB CHECKER
    if (currentModule === "job") {

        let jobWarnings = [];

        if (input.includes("registration fee") ||
            input.includes("joining fee") ||
            input.includes("processing fee")) {
            jobWarnings.push("Job registration or processing fee requested");
        }

        if (/guaranteed income|earn\s*50000|earn\s*1\s*lakh|salary of rs\.?\s*50000|salary.*50000|50000.*salary|high salary/i.test(input)) {
            jobWarnings.push("Unusually high income promise");
}

        if (/urgent joining|apply immediately|limited time|limited offer|hurry|apply now|last chance|immediate joining|act fast/i.test(input)) {
            jobWarnings.push("Urgent job offer language");
}

        if (/bank details|bank account|aadhaar|aadhar|pan number|otp|password|credit card|debit card/i.test(input)) {
            jobWarnings.push("Sensitive personal information requested");
}

        let score = Math.min(jobWarnings.length * 30, 100);

        let message = "<h3>CYBERSHIELD JOB SAFETY REPORT</h3>";
        message += "Risk Score: " + score + "/100<br>";

        if (jobWarnings.length > 0) {
            message += "<br><b>Warning signs found:</b><br>";
            message += jobWarnings.join("<br>");
        } else {
            message += "<br>No matching warning signs found.";
        }

        message += "<br><br>This basic checker cannot confirm whether a job offer is genuine.";

        result.innerHTML = message;

        tamilResult.innerHTML =
            "<h3>வேலைவாய்ப்பு மோசடி பாதுகாப்பு</h3>" +
            "வேலைக்காக முன்பணம் அல்லது பதிவு கட்டணம் செலுத்த வேண்டாம். " +
            "நிறுவனத்தின் உண்மைத்தன்மையை அதிகாரப்பூர்வ இணையதளத்தில் சரிபார்க்கவும்.";

        return;
    }

    // VOICE SAFETY
    if (currentModule === "voice") {

        result.innerHTML =
            "<h3>Voice Safety Guidance</h3>" +
            "This prototype does not analyse audio recordings. " +
            "Verify unexpected emergency calls through a trusted number.";

        tamilResult.innerHTML =
            "<h3>குரல் மோசடி பாதுகாப்பு</h3>" +
            "ஆடியோ பதிவுகளை இந்த மாதிரி ஆய்வு செய்யாது. " +
            "எதிர்பாராத அவசர அழைப்புகளை நம்பகமான எண்ணில் தொடர்புகொண்டு சரிபார்க்கவும்.";

        return;
    }

    // IDENTITY PROTECTION
    if (currentModule === "identity") {

        result.innerHTML =
            "<h3>Identity Protection Guidance</h3>" +
            "Save the profile link and evidence. Report impersonation " +
            "through the social platform's official reporting option.";

        tamilResult.innerHTML =
            "<h3>அடையாளப் பாதுகாப்பு</h3>" +
            "போலி சுயவிவரத்தின் லிங்க் மற்றும் ஆதாரங்களைச் சேமிக்கவும். " +
            "சம்பந்தப்பட்ட சமூக வலைத்தளத்தின் அதிகாரப்பூர்வ வழியில் புகார் அளிக்கவும்.";

        return;
    }

    // UPI SAFETY
    if (currentModule === "upi") {

        result.innerHTML =
            "<h3>UPI Safety Guidance</h3>" +
            "Never share your UPI PIN or OTP. " +
            "Do not enter your PIN to receive money.";

        tamilResult.innerHTML =
            "<h3>UPI பாதுகாப்பு வழிகாட்டுதல்</h3>" +
            "உங்கள் UPI PIN அல்லது OTP-ஐ யாரிடமும் பகிர வேண்டாம். " +
            "பணம் பெறுவதற்கு உங்கள் PIN-ஐ உள்ளிட வேண்டாம்.";

        return;
    }

    // SCAM MESSAGE CHECKER
    let warnings = [];

const patterns = [
    { pattern: /otp|one.time.password/i, reason: "OTP request" },
    { pattern: /urgent|immediately|hurry|today|act now/i, reason: "Urgent language" },
    { pattern: /password|pin/i, reason: "Sensitive credential request" },
    { pattern: /prize|lottery|winner|won a prize|free gift/i, reason: "Unexpected prize claim" },
    { pattern: /pay|payment|registration fee|transfer money/i, reason: "Payment request" },
    { pattern: /click|http|www/i, reason: "Link or click instruction" },
    { pattern: /bank account|bank details|credit card|debit card/i, reason: "Banking information request" },
    { pattern: /account blocked|account suspended|verify your account/i, reason: "Account threat or verification request" },
    { pattern: /claim your reward|claim now|cashback/i, reason: "Suspicious reward claim" },
    { pattern: /send money|share your details/i, reason: "Request for money or personal details" }
];
    patterns.forEach(item => {
        if (item.pattern.test(input)) {
            warnings.push(item.reason);
        }
    });

    let riskScore = Math.min(warnings.length * 30, 100);

    let riskLevel = "";
    let advice = "";
    let tamilAdvice = "";

    if (riskScore >= 60) {
        riskLevel = "HIGH RISK";
        advice = "Stop! Do not share OTP or money. Verify through official sources.";
        tamilAdvice = "நிறுத்துங்கள்! OTP அல்லது பணத்தைப் பகிர வேண்டாம். அதிகாரப்பூர்வ வழிகளில் சரிபார்க்கவும்.";
    }
    else if (riskScore >= 30) {
        riskLevel = "MEDIUM RISK";
        advice = "Be careful. Verify before taking action.";
        tamilAdvice = "எச்சரிக்கையாக இருங்கள். எந்த நடவடிக்கையும் எடுப்பதற்கு முன் சரிபார்க்கவும்.";
    }
    else {
        riskLevel = "LOW RISK";
        advice = "No matching warning patterns found. Still stay alert.";
        tamilAdvice = "குறிப்பிட்ட எச்சரிக்கை அறிகுறிகள் எதுவும் கிடைக்கவில்லை. இருப்பினும் கவனமாக இருங்கள்.";
    }

    result.innerHTML =
        "<h3>CYBERSHIELD SECURITY REPORT</h3>" +
        "<h2>Risk Score: " + riskScore + "/100</h2>" +
        "<h3>Risk Level: " + riskLevel + "</h3>" +
        "<p>Warning signs found:</p>" +
        (warnings.length > 0 ? warnings.join("<br>") : "No matching warning patterns") +
        "<p><b>Safety Advice:</b> " + advice + "</p>" +
        "<p><small>This is a basic rule-based score, not a confirmed scam detection.</small></p>";

    tamilResult.innerHTML =
        "<h3>சைபர் பாதுகாப்பு அறிக்கை</h3>" +
        "<h3>ஆபத்து நிலை: " + riskLevel + "</h3>" +
        "<b>பாதுகாப்பு ஆலோசனை:</b> " + tamilAdvice;
}
