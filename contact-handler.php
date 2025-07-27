<?php
/**
 * WebStudio Contact Form Handler
 * Processes contact form submissions and sends emails
 */

// Set response headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Configuration
$config = [
    'to_email' => 'hello@webstudio.com',
    'from_email' => 'noreply@webstudio.com',
    'subject_prefix' => '[WebStudio Contact] ',
    'max_message_length' => 5000,
    'required_fields' => ['name', 'email', 'project-type', 'message'],
    'honeypot_field' => 'website' // Hidden field to catch bots
];

// Function to sanitize input
function sanitizeInput($input) {
    return htmlspecialchars(strip_tags(trim($input)), ENT_QUOTES, 'UTF-8');
}

// Function to validate email
function isValidEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

// Function to validate required fields
function validateRequiredFields($data, $required) {
    $errors = [];
    foreach ($required as $field) {
        if (empty($data[$field])) {
            $errors[] = ucfirst(str_replace('-', ' ', $field)) . ' is required';
        }
    }
    return $errors;
}

// Function to send email
function sendContactEmail($data, $config) {
    $to = $config['to_email'];
    $subject = $config['subject_prefix'] . 'New Contact Form Submission';
    
    // Email headers
    $headers = [
        'From: ' . $config['from_email'],
        'Reply-To: ' . $data['email'],
        'X-Mailer: PHP/' . phpversion(),
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8'
    ];
    
    // Email body
    $body = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <title>Contact Form Submission</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1A1A1A; color: #00D4FF; padding: 20px; text-align: center; }
            .content { background: #f9f9f9; padding: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #555; }
            .value { margin-top: 5px; padding: 10px; background: white; border-left: 3px solid #00D4FF; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>🚀 WebStudio Contact Form</h1>
                <p>New message received</p>
            </div>
            <div class='content'>
                <div class='field'>
                    <div class='label'>Name:</div>
                    <div class='value'>" . htmlspecialchars($data['name']) . "</div>
                </div>
                <div class='field'>
                    <div class='label'>Email:</div>
                    <div class='value'>" . htmlspecialchars($data['email']) . "</div>
                </div>
                <div class='field'>
                    <div class='label'>Project Type:</div>
                    <div class='value'>" . htmlspecialchars($data['project-type']) . "</div>
                </div>";
    
    if (!empty($data['budget'])) {
        $body .= "
                <div class='field'>
                    <div class='label'>Budget Range:</div>
                    <div class='value'>" . htmlspecialchars($data['budget']) . "</div>
                </div>";
    }
    
    $body .= "
                <div class='field'>
                    <div class='label'>Message:</div>
                    <div class='value'>" . nl2br(htmlspecialchars($data['message'])) . "</div>
                </div>
                <div class='field'>
                    <div class='label'>Submitted:</div>
                    <div class='value'>" . date('Y-m-d H:i:s') . "</div>
                </div>
                <div class='field'>
                    <div class='label'>IP Address:</div>
                    <div class='value'>" . $_SERVER['REMOTE_ADDR'] . "</div>
                </div>
            </div>
            <div class='footer'>
                <p>This message was sent from the WebStudio contact form.</p>
            </div>
        </div>
    </body>
    </html>";
    
    return mail($to, $subject, $body, implode("\r\n", $headers));
}

// Function to send auto-reply email
function sendAutoReply($email, $name) {
    $subject = 'Thank you for contacting WebStudio!';
    $headers = [
        'From: WebStudio <hello@webstudio.com>',
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8'
    ];
    
    $body = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <title>Thank you for contacting WebStudio</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1A1A1A; color: #00D4FF; padding: 20px; text-align: center; }
            .content { background: #f9f9f9; padding: 20px; }
            .cta-button { 
                display: inline-block; 
                background: linear-gradient(135deg, #00D4FF, #8B5CF6); 
                color: white; 
                padding: 12px 24px; 
                text-decoration: none; 
                border-radius: 25px; 
                margin: 10px 0; 
            }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>🚀 Thank You, " . htmlspecialchars($name) . "!</h1>
            </div>
            <div class='content'>
                <p>Thank you for reaching out to WebStudio! We've received your message and we're excited to learn about your project.</p>
                
                <p><strong>What happens next?</strong></p>
                <ul>
                    <li>We'll review your project details within 24 hours</li>
                    <li>Our team will prepare a customized proposal</li>
                    <li>We'll schedule a call to discuss your vision</li>
                </ul>
                
                <p>In the meantime, feel free to check out our recent work and follow us on social media for updates.</p>
                
                <p style='text-align: center;'>
                    <a href='#' class='cta-button'>View Our Portfolio</a>
                </p>
                
                <p>Best regards,<br>
                <strong>The WebStudio Team</strong></p>
            </div>
            <div class='footer'>
                <p>WebStudio - Building Your Digital Future</p>
                <p>Email: hello@webstudio.com | Phone: +1 (555) 123-4567</p>
            </div>
        </div>
    </body>
    </html>";
    
    return mail($email, $subject, $body, implode("\r\n", $headers));
}

// Function to log submission
function logSubmission($data) {
    $logFile = 'contact_submissions.log';
    $logEntry = date('Y-m-d H:i:s') . ' - ' . $data['email'] . ' - ' . $data['project-type'] . "\n";
    file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX);
}

// Main processing
try {
    // Get POST data
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input) {
        $input = $_POST;
    }
    
    // Check for honeypot (simple bot protection)
    if (!empty($input[$config['honeypot_field']])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Spam detected']);
        exit;
    }
    
    // Sanitize all input data
    $data = [];
    foreach ($input as $key => $value) {
        $data[$key] = sanitizeInput($value);
    }
    
    // Validate required fields
    $errors = validateRequiredFields($data, $config['required_fields']);
    
    // Validate email format
    if (!empty($data['email']) && !isValidEmail($data['email'])) {
        $errors[] = 'Please enter a valid email address';
    }
    
    // Validate message length
    if (!empty($data['message']) && strlen($data['message']) > $config['max_message_length']) {
        $errors[] = 'Message is too long (maximum ' . $config['max_message_length'] . ' characters)';
    }
    
    // If there are validation errors, return them
    if (!empty($errors)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Validation failed',
            'errors' => $errors
        ]);
        exit;
    }
    
    // Rate limiting (simple implementation)
    $rateLimitFile = 'rate_limit_' . md5($_SERVER['REMOTE_ADDR']) . '.txt';
    if (file_exists($rateLimitFile)) {
        $lastSubmission = (int)file_get_contents($rateLimitFile);
        if (time() - $lastSubmission < 60) { // 1 minute cooldown
            http_response_code(429);
            echo json_encode([
                'success' => false,
                'message' => 'Please wait before submitting another message'
            ]);
            exit;
        }
    }
    file_put_contents($rateLimitFile, time());
    
    // Send emails
    $emailSent = sendContactEmail($data, $config);
    $autoReplySent = sendAutoReply($data['email'], $data['name']);
    
    // Log the submission
    logSubmission($data);
    
    // Return success response
    if ($emailSent) {
        echo json_encode([
            'success' => true,
            'message' => 'Thank you for your message! We\'ll get back to you within 24 hours.',
            'auto_reply_sent' => $autoReplySent
        ]);
    } else {
        throw new Exception('Failed to send email');
    }
    
} catch (Exception $e) {
    // Log error
    error_log('Contact form error: ' . $e->getMessage());
    
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Sorry, there was an error processing your request. Please try again later.'
    ]);
}
?>