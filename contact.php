<?php
// Formulaire de contact LexSolutions : envoie la demande à contact@lexsolutions.cm.
// Remplace Formspree (identifiant jamais configuré : aucun message n'arrivait).
// Protections : méthode POST seule, champ piège anti-robots, validation des
// champs, en-têtes nettoyés (pas d'injection), 5 envois par heure et par adresse IP.

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

const DESTINATAIRE = 'contact@lexsolutions.cm';
const EXPEDITEUR = 'contact@lexsolutions.cm';
const LIMITE_PAR_HEURE = 5;

function repondre(int $code, array $donnees): void {
    http_response_code($code);
    echo json_encode($donnees, JSON_UNESCAPED_UNICODE);
    exit;
}

function champ(string $nom, int $max): string {
    $v = isset($_POST[$nom]) ? trim((string) $_POST[$nom]) : '';
    return mb_substr($v, 0, $max, 'UTF-8');
}

function une_ligne(string $v): string {
    return trim(preg_replace('/[\r\n\t]+/', ' ', $v));
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    repondre(405, ['ok' => false, 'error' => 'method']);
}

// Champ piège : un humain ne le voit pas, un robot le remplit.
if (champ('_gotcha', 200) !== '') {
    repondre(200, ['ok' => true]);
}

$nom = une_ligne(champ('nom', 120));
$societe = une_ligne(champ('societe', 160));
$email = une_ligne(champ('email', 160));
$tel = une_ligne(champ('tel', 40));
$pole = une_ligne(champ('pole', 80));
$message = champ('message', 5000);

if ($nom === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    repondre(400, ['ok' => false, 'error' => 'invalid']);
}

// Limite d'envois par adresse IP (fichier temporaire, une heure glissante).
$ip = $_SERVER['REMOTE_ADDR'] ?? 'inconnue';
$fichier = sys_get_temp_dir() . '/lexs-contact-' . hash('sha256', $ip);
$maintenant = time();
$envois = [];
if (is_file($fichier)) {
    $envois = array_filter(
        array_map('intval', explode(',', (string) @file_get_contents($fichier))),
        fn($t) => $t > $maintenant - 3600
    );
}
if (count($envois) >= LIMITE_PAR_HEURE) {
    repondre(429, ['ok' => false, 'error' => 'rate']);
}
$envois[] = $maintenant;
@file_put_contents($fichier, implode(',', $envois), LOCK_EX);

date_default_timezone_set('Africa/Douala');
$sujet = 'Nouvelle demande · ' . ($pole !== '' ? $pole : 'Site') . ' · ' . $nom;
$corps = "Nouvelle demande reçue depuis le site lexsolutions.cm\n"
    . str_repeat('-', 48) . "\n\n"
    . "Nom : $nom\n"
    . ($societe !== '' ? "Entreprise : $societe\n" : '')
    . "E-mail : $email\n"
    . ($tel !== '' ? "Téléphone / WhatsApp : $tel\n" : '')
    . ($pole !== '' ? "Pôle concerné : $pole\n" : '')
    . "\nMessage :\n$message\n\n"
    . str_repeat('-', 48) . "\n"
    . 'Reçu le ' . date('d/m/Y à H:i') . " (heure de Douala).\n"
    . "Répondez directement à cet e-mail pour écrire à la personne.\n";

$entetes = implode("\r\n", [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'From: =?UTF-8?B?' . base64_encode('Site LexSolutions') . '?= <' . EXPEDITEUR . '>',
    'Reply-To: ' . $email,
    'X-Mailer: lexsolutions.cm',
]);

$ok = mail(DESTINATAIRE, '=?UTF-8?B?' . base64_encode($sujet) . '?=', $corps, $entetes, '-f' . EXPEDITEUR);

if (!$ok) {
    repondre(500, ['ok' => false, 'error' => 'send']);
}
repondre(200, ['ok' => true]);
