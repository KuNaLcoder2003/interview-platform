-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL DEFAULT '',
    "password" VARCHAR(255) NOT NULL,
    "avatar" TEXT NOT NULL DEFAULT '',
    "reatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "details" (
    "id" SERIAL NOT NULL,
    "experience" VARCHAR(255) NOT NULL,
    "current_orgainsation" VARCHAR(255) NOT NULL,
    "role" VARCHAR(255) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "work_history" (
    "id" SERIAL NOT NULL,
    "organisation_name" VARCHAR(255) NOT NULL,
    "role" VARCHAR(255) NOT NULL,
    "from" TIMESTAMP(3) NOT NULL,
    "to" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "work_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "details_user_id_key" ON "details"("user_id");

-- AddForeignKey
ALTER TABLE "details" ADD CONSTRAINT "details_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_history" ADD CONSTRAINT "work_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
