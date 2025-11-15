-- CreateTable
CREATE TABLE "interview_chat" (
    "id" TEXT NOT NULL,
    "interview_id" TEXT NOT NULL,
    "chat" JSONB[],

    CONSTRAINT "interview_chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interviews" (
    "id" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "started_at" TIMESTAMP(3) NOT NULL,
    "ended_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "interviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "score" (
    "id" TEXT NOT NULL,
    "interview_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "score_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "interview_chat_id_key" ON "interview_chat"("id");

-- CreateIndex
CREATE UNIQUE INDEX "interview_chat_interview_id_key" ON "interview_chat"("interview_id");

-- CreateIndex
CREATE UNIQUE INDEX "interviews_id_key" ON "interviews"("id");

-- CreateIndex
CREATE UNIQUE INDEX "score_id_key" ON "score"("id");

-- CreateIndex
CREATE UNIQUE INDEX "score_interview_id_key" ON "score"("interview_id");

-- AddForeignKey
ALTER TABLE "interview_chat" ADD CONSTRAINT "interview_chat_interview_id_fkey" FOREIGN KEY ("interview_id") REFERENCES "interviews"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interviews" ADD CONSTRAINT "interviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "score" ADD CONSTRAINT "score_interview_id_fkey" FOREIGN KEY ("interview_id") REFERENCES "interviews"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "score" ADD CONSTRAINT "score_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
