import type { Request, Response } from "express";
import type { CreateAssessmentQuestionBody, UpdateAssessmentQuestionBody } from "../utils/type";
import prismaClient from "../utils/prisma";
import apiResponse from "../utils/apiResponse";

class AssessmentSectionController {
    async createAssessmentSection(req: Request, res: Response) {
        try {
            if (!req.user) throw new Error("User not authenticated");
            const data: CreateAssessmentQuestionBody = req.body;
            if (!data) throw new Error("Please provide all fields");
            if (req.user.type !== "SUPERADMIN" && req.user.type !== "ADMIN" && req.user.type !== "INSTITUTION" && req.user.type !== "VENDOR") throw new Error("User Not Authorized to create Assessments");


            const createdAssessmentQuestion = await prismaClient.assessmentQuestion.create({
                data: {
                    question: data.question,
                    options: data.options,
                    ...(data.problem ? { problem: { connect: { id: data.problem } } } : {}),
                    maxMarks: data.maxMarks,
                }
            });
            if (!createdAssessmentQuestion) throw new Error("Error Creating Assessment Section");
            return res.status(200)
                .json(apiResponse(200, "Assessment Section Created Successfully.", createdAssessmentQuestion))
        } catch (error: any) {
            console.log(error);
            return res.status(200).json(apiResponse(200, error.message, null));
        }
    }
    async updateAssessmentSection(req: Request, res: Response) {
        try {
            const sectionId = req.params.id;
            if (!req.user) throw new Error("User not authenticated");
            const data: UpdateAssessmentQuestionBody = req.body;
            if (!data) throw new Error("Please provide all fields");
            if (req.user.type !== "SUPERADMIN" && req.user.type !== "ADMIN" && req.user.type !== "INSTITUTION" && req.user.type !== "VENDOR") throw new Error("User Not Authorized to update Assessments");

            const section = await prismaClient.assessmentSection.findFirst({
                where: { id: sectionId },
            });
            if (!section) throw new Error("assessment section not found");

            const updatedAssessmentSection = await prismaClient.assessmentQuestion.update({
                where: { id: sectionId },
                data: {
                    name: data.name ?? section.name,
                    marksPerQuestion: data.marksPerQuestion ?? section.marksPerQuestion,
                }
            });
            if (!updatedAssessmentSection) throw new Error("Error Updating Assessment Section");
            return res.status(200)
                .json(apiResponse(200, "Assessment Section Updated Successfully.", updatedAssessmentSection));
        } catch (error: any) {
            console.log(error);
            return res.status(200).json(apiResponse(200, error.message, null));
        }
    }
    async deleteAssessmentSection(req: Request, res: Response) {
        try {
            const sectionId = req.params.id;
            if (!req.user) throw new Error("User not authenticated");
            if (req.user.type !== "SUPERADMIN" && req.user.type !== "ADMIN" && req.user.type !== "INSTITUTION" && req.user.type !== "VENDOR") throw new Error("User Not Authorized to delete Assessments");

            const section = await prismaClient.assessmentSection.findFirst({
                where: { id: sectionId },
            });
            if (!section) throw new Error("assessment section not found");

            const deletedAssessmentSection = await prismaClient.assessmentSection.delete({
                where: { id: sectionId }
            })
            if (!deletedAssessmentSection) throw new Error("Error Deleting Assessment Section");
            return res.status(200)
                .json(apiResponse(200, "Assessment Section Deleted Successfully.", deletedAssessmentSection));
        } catch (error: any) {
            console.log(error);
            return res.status(200).json(apiResponse(200, error.message, null));
        }
    }
    async getAllAssessmentSection(req: Request, res: Response) {
        try {
            if (!req.user) throw new Error("user is not authenticated");
            if (req.user.type !== "SUPERADMIN" && req.user.type !== "ADMIN" && req.user.type !== "INSTITUTION" && req.user.type !== "VENDOR") throw new Error("User Not Authorized to delete Assessments");
            const sections = await prismaClient.assessmentSection.findMany({
                select: {
                    id: true,
                    name: true,
                    marksPerQuestion: true,
                    assessmentType: true,
                    assessmentId: true,
                },
            });

            return res
                .status(200)
                .json(apiResponse(200, "assessment sections fetched successfully", sections));
        } catch (error: any) {
            console.log(error);
            return res.status(200).json(apiResponse(200, error.message, null));
        }
    }
    async getAssessmentSectionById(req: Request, res: Response) {
        try {
            const sectionId = req.params.id;
            if (!req.user) throw new Error("User not authenticated");
            if (req.user.type !== "SUPERADMIN" && req.user.type !== "ADMIN" && req.user.type !== "INSTITUTION" && req.user.type !== "VENDOR") throw new Error("User Not Authorized to update Assessments");

            const sections = await prismaClient.assessmentSection.findFirst({
                where: { id: sectionId },
                select: {
                    name: true,
                    marksPerQuestion: true,
                    assessmentType: true,
                    assessmentId: true,
                }
            });
            if (!sections) throw new Error("assessment sections not found");



            return res.status(200)
                .json(apiResponse(200, "Assessment Fetched Successfully", sections));
        } catch (error: any) {
            console.log(error);
            return res.status(200).json(apiResponse(200, error.message, null));
        }
    }
}
export default new AssessmentSectionController();