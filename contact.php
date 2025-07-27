<?php
// Enable CORS for cross-origin requests
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Configuration
$config = [
    'to_email' => 'hello@webstudiopro.com',
    'from_email' => 'noreply@webstudiopro.com',
    'from_name' => 'WebStudio Pro Contact Form',
    'subject' => 'New Contact Form Submission',
    'success_message' => 'Thank you for your message! We\'ll get back to you soon.',
    'error_message' => 'Sorry, there was an error sending your message. Please try again.',
];

// Response function
function sendResponse($success, $message, $data = null) {
    $response = [
        'success' => $success,
        'message' => $message,
        'timestamp' => date('Y-m-d H:i:s')
    ];
    
    if ($data !== null) {
        $response['data'] = $data;
    }
    
    echo json_encode($response);
    exit();
}

// Validation functions
function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

function sanitizeInput($input) {
    return htmlspecialchars(strip_tags(trim($input)), ENT_QUOTES, 'UTF-8');
}

function validateRequired($value, $fieldName) {
    if (empty(trim($value))) {
        return "$fieldName is required.";
    }
    return null;
}

// Main processing
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Get POST data
        $input = json_decode(file_get_contents('php://input'), true);
        
        // If JSON decode fails, try regular POST data
        if ($input === null) {
            $input = $_POST;
        }
        
        // Extract and sanitize form data
        $name = sanitizeInput($input['name'] ?? '');
        $email = sanitizeInput($input['email'] ?? '');
        $projectType = sanitizeInput($input['project-type'] ?? '');
        $message = sanitizeInput($input['message'] ?? '');
        
        // Validation errors array
        $errors = [];
        
        // Validate required fields
        if ($error = validateRequired($name, 'Name')) {
            $errors['name'] = $error;
        }
        
        if ($error = validateRequired($email, 'Email')) {
            $errors['email'] = $error;
        } elseif (!validateEmail($email)) {
            $errors['email'] = 'Please enter a valid email address.';
        }
        
        if ($error = validateRequired($projectType, 'Project Type')) {
            $errors['project-type'] = $error;
        }
        
        if ($error = validateRequired($message, 'Message')) {
            $errors['message'] = $error;
        }
        
        // Additional validation
        if (strlen($name) > 100) {
            $errors['name'] = 'Name must be less than 100 characters.';
        }
        
        if (strlen($message) > 2000) {
            $errors['message'] = 'Message must be less than 2000 characters.';
        }
        
        // Check for spam (simple honeypot and rate limiting)
        $userIP = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
        $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';
        
        // Simple spam detection
        if (preg_match('/\b(?:http|www|\.com|\.org|\.net)\b/i', $name)) {
            $errors['spam'] = 'Spam detected.';
        }
        
        // If there are validation errors, return them
        if (!empty($errors)) {
            sendResponse(false, 'Validation errors occurred.', ['errors' => $errors]);
        }
        
        // Prepare email content
        $emailBody = generateEmailBody($name, $email, $projectType, $message, $userIP, $userAgent);
        
        // Send email
        $emailSent = sendEmail(
            $config['to_email'],
            $config['subject'],
            $emailBody,
            $email,
            $name
        );
        
        if ($emailSent) {
            // Log successful submission (optional)
            logSubmission($name, $email, $projectType, $userIP);
            
            sendResponse(true, $config['success_message']);
        } else {
            sendResponse(false, $config['error_message']);
        }
        
    } catch (Exception $e) {
        // Log error (in production, don't expose internal errors)
        error_log('Contact form error: ' . $e->getMessage());
        sendResponse(false, 'An unexpected error occurred. Please try again later.');
    }
} else {
    sendResponse(false, 'Invalid request method.');
}

// Email generation function
function generateEmailBody($name, $email, $projectType, $message, $userIP, $userAgent) {
    $projectTypes = [
        'landing-page' => 'Landing Page',
        'web-app' => 'Web Application',
        'python-app' => 'Python Application',
        'telegram-bot' => 'Telegram Bot',
        'other' => 'Other'
    ];
    
    $projectTypeDisplay = $projectTypes[$projectType] ?? $projectType;
    
    $emailBody = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #00D4FF, #FF007A); color: white; padding: 20px; text-align: center; }
            .content { background: #f9f9f9; padding: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #555; }
            .value { background: white; padding: 10px; border-left: 4px solid #00D4FF; margin-top: 5px; }
            .footer { background: #333; color: white; padding: 15px; text-align: center; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>🚀 New Contact Form Submission</h2>
                <p>WebStudio Pro</p>
            </div>
            <div class='content'>
                <div class='field'>
                    <div class='label'>Name:</div>
                    <div class='value'>" . htmlspecialchars($name) . "</div>
                </div>
                <div class='field'>
                    <div class='label'>Email:</div>
                    <div class='value'>" . htmlspecialchars($email) . "</div>
                </div>
                <div class='field'>
                    <div class='label'>Project Type:</div>
                    <div class='value'>" . htmlspecialchars($projectTypeDisplay) . "</div>
                </div>
                <div class='field'>
                    <div class='label'>Message:</div>
                    <div class='value'>" . nl2br(htmlspecialchars($message)) . "</div>
                </div>
            </div>
            <div class='footer'>
                <p>Submitted on: " . date('Y-m-d H:i:s') . "</p>
                <p>IP Address: " . htmlspecialchars($userIP) . "</p>
                <p>User Agent: " . htmlspecialchars(substr($userAgent, 0, 100)) . "</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    return $emailBody;
}

// Email sending function
function sendEmail($to, $subject, $body, $replyTo, $replyToName) {
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: WebStudio Pro <noreply@webstudiopro.com>',
        'Reply-To: ' . $replyToName . ' <' . $replyTo . '>',
        'X-Mailer: PHP/' . phpversion(),
        'X-Priority: 3',
        'X-MSMail-Priority: Normal'
    ];
    
    $headersString = implode("\r\n", $headers);
    
    // Use PHP's mail function (in production, consider using PHPMailer or similar)
    return mail($to, $subject, $body, $headersString);
}

// Logging function (optional)
function logSubmission($name, $email, $projectType, $userIP) {
    $logFile = 'contact_submissions.log';
    $logEntry = date('Y-m-d H:i:s') . " | " . 
                $userIP . " | " . 
                $email . " | " . 
                $projectType . " | " . 
                substr($name, 0, 50) . "\n";
    
    // Only log if the log file is writable
    if (is_writable(dirname($logFile))) {
        file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX);
    }
}

// Rate limiting function (simple implementation)
function checkRateLimit($userIP, $maxRequests = 5, $timeWindow = 3600) {
    $rateLimitFile = 'rate_limit.json';
    $currentTime = time();
    
    // Load existing rate limit data
    $rateLimitData = [];
    if (file_exists($rateLimitFile)) {
        $rateLimitData = json_decode(file_get_contents($rateLimitFile), true) ?: [];
    }
    
    // Clean old entries
    $rateLimitData = array_filter($rateLimitData, function($data) use ($currentTime, $timeWindow) {
        return ($currentTime - $data['first_request']) < $timeWindow;
    });
    
    // Check current IP
    if (!isset($rateLimitData[$userIP])) {
        $rateLimitData[$userIP] = [
            'count' => 1,
            'first_request' => $currentTime
        ];
    } else {
        $rateLimitData[$userIP]['count']++;
    }
    
    // Save rate limit data
    file_put_contents($rateLimitFile, json_encode($rateLimitData));
    
    // Check if rate limit exceeded
    return $rateLimitData[$userIP]['count'] <= $maxRequests;
}

// Auto-responder function (optional)
function sendAutoResponse($email, $name) {
    $subject = "Thank you for contacting WebStudio Pro!";
    $body = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #00D4FF, #FF007A); color: white; padding: 20px; text-align: center; }
            .content { background: #f9f9f9; padding: 20px; }
            .footer { background: #333; color: white; padding: 15px; text-align: center; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>🚀 Thank You!</h2>
            </div>
            <div class='content'>
                <p>Hi " . htmlspecialchars($name) . ",</p>
                <p>Thank you for reaching out to WebStudio Pro! We've received your message and will get back to you within 24 hours.</p>
                <p>In the meantime, feel free to check out our portfolio and learn more about our services on our website.</p>
                <p>Best regards,<br>The WebStudio Pro Team</p>
            </div>
            <div class='footer'>
                <p>WebStudio Pro | hello@webstudiopro.com | +1 (555) 123-4567</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: WebStudio Pro <hello@webstudiopro.com>',
        'X-Mailer: PHP/' . phpversion()
    ];
    
    $headersString = implode("\r\n", $headers);
    
    return mail($email, $subject, $body, $headersString);
}

?>