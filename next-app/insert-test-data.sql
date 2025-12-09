-- Insert test data directly into Supabase
-- Run this in Supabase SQL Editor to test data insertion

-- 1. Insert a test user (using a simple password hash placeholder - in real app this would be argon2)
-- Note: In production, passwords should be hashed with argon2
INSERT INTO "User" (
    "id",
    "firstName",
    "lastName",
    "email",
    "emailEncrypted",
    "passwordHash",
    "emailVerified",
    "country",
    "timezone",
    "createdAt",
    "updatedAt"
) VALUES (
    'test-user-' || substr(md5(random()::text), 1, 10),
    'Test',
    'User',
    'test@thearc.com',
    'encrypted-email-placeholder', -- In real app, this would be encrypted
    '$argon2id$v=19$m=65536,t=3,p=4$placeholder', -- Placeholder hash
    true,
    'US',
    'America/New_York',
    NOW(),
    NOW()
)
ON CONFLICT ("email") DO NOTHING
RETURNING "id", "email";

-- 2. Get the user ID (replace with actual ID from step 1)
-- Let's use a subquery to get the user
DO $$
DECLARE
    test_user_id TEXT;
BEGIN
    -- Get or create test user
    SELECT "id" INTO test_user_id
    FROM "User"
    WHERE "email" = 'test@thearc.com';
    
    IF test_user_id IS NULL THEN
        INSERT INTO "User" (
            "id",
            "firstName",
            "lastName",
            "email",
            "emailEncrypted",
            "passwordHash",
            "emailVerified",
            "country",
            "timezone",
            "createdAt",
            "updatedAt"
        ) VALUES (
            'test-user-' || substr(md5(random()::text), 1, 10),
            'Test',
            'User',
            'test@thearc.com',
            'encrypted-email-placeholder',
            '$argon2id$v=19$m=65536,t=3,p=4$placeholder',
            true,
            'US',
            'America/New_York',
            NOW(),
            NOW()
        )
        RETURNING "id" INTO test_user_id;
    END IF;
    
    -- 3. Insert consent
    INSERT INTO "Consent" (
        "id",
        "userId",
        "type",
        "accepted",
        "acceptedAt"
    ) VALUES (
        'consent-' || substr(md5(random()::text), 1, 10),
        test_user_id,
        'health_data',
        true,
        NOW()
    )
    ON CONFLICT DO NOTHING;
    
    -- 4. Insert questionnaire response (encrypted data placeholder)
    INSERT INTO "QuestionnaireResponse" (
        "id",
        "userId",
        "persona",
        "responseDataEncrypted",
        "scoresEncrypted",
        "createdAt",
        "completedAt"
    ) VALUES (
        'response-' || substr(md5(random()::text), 1, 10),
        test_user_id,
        'women',
        'dummy-encrypted-response-data',
        'dummy-encrypted-scores-data',
        NOW(),
        NOW()
    )
    ON CONFLICT DO NOTHING;
    
    RAISE NOTICE 'Test data inserted for user: %', test_user_id;
END $$;

-- 5. Verify the data
SELECT 
    u."id" as user_id,
    u."email",
    u."firstName" || ' ' || u."lastName" as name,
    COUNT(DISTINCT c."id") as consent_count,
    COUNT(DISTINCT qr."id") as questionnaire_count
FROM "User" u
LEFT JOIN "Consent" c ON c."userId" = u."id"
LEFT JOIN "QuestionnaireResponse" qr ON qr."userId" = u."id"
WHERE u."email" = 'test@thearc.com'
GROUP BY u."id", u."email", u."firstName", u."lastName";

-- 6. Show all table counts
SELECT 
    'User' as table_name,
    COUNT(*) as record_count
FROM "User"
UNION ALL
SELECT 
    'Consent',
    COUNT(*)
FROM "Consent"
UNION ALL
SELECT 
    'QuestionnaireResponse',
    COUNT(*)
FROM "QuestionnaireResponse"
UNION ALL
SELECT 
    'VerificationToken',
    COUNT(*)
FROM "VerificationToken"
UNION ALL
SELECT 
    'PasswordResetToken',
    COUNT(*)
FROM "PasswordResetToken"
ORDER BY table_name;

