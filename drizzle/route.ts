import { db } from "./db/db";
import {users} from "./db/schema";
import express, { Request, Response } from 'express';

import { eq } from 'drizzle-orm';
const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     CreateUser:
 *       type: object
 *       properties:
 *           name:
 *             type: string
 *             description: user name
 *             example: "Jatan Tiwari"
 *           username:
 *             type: string
 *             description: your username
 *             example: jatan
 *           password:
 *             type: string
 *             description: password
 *             example: password
 *    
 *          
 */

/**
 * @swagger
 * /:
 *   post:
 *     tags: [User]
 *     summary: Create User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUser'
 *     responses:
 *       '200':
 *         description: Successfully send
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateUser'
 *       '400':
 *         description: Not found
 *       '500':
 *         description: Internal server error
*/
router.post('',async (req: any, res: any)=> {
  try {
    const data = req.body;
    const result = await db.insert(users).values(data).returning()
    if (result) {
      return res.status(200).json({ "data": result, "message": "Registered" })
    }
    return res.status(404).json({ "message": "Unable to create user", 'data': result })
  }
  catch (err) {
    return res.status(500).json({ "message": "Internal Server Error", 'data': err })
  }

})

/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateUser:
 *       type: object
 *       properties:
 *           name:
 *             type: string
 *             description: user name
 *             example: "Jatan Tiwari"
 *           password:
 *             type: string
 *             description: password
 *             example: password 
 *          
 */

/**
 * @swagger
 * /{id}:
 *   put:
 *     tags: [User]
 *     summary: Update User
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUser'
 *     responses:
 *       '200':
 *         description: Successfully send
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateUser'
 *       '400':
 *         description: Not found
 *       '500':
 *         description: Internal server error
*/

router.put('/:id', async (req: any, res: any) => {
  try {
    const data = req.body
    const id = req.params.id
    const update = await db.update(users)
      .set({name:data.name, password:data.password})
      .where(eq(users.id, id)).returning()
    if (update) {
      return res.status(200).json({ "message": "updated", data: update })
    }
    return res.status(500).json({ "message": "unable to update", data: update })
  } catch (err) {
    return res.status(500).json({ "message": "Internal Server Error", 'data': err })
  }
})


/**
 * @swagger
 * /{id}:
 *   get:
 *     tags: [User]
 *     summary: Get User By Id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *     responses:
 *       '200':
 *         description: Successfully fetched
 *       '400':
 *         description: Not found
 *       '500':
 *         description: Internal server error
*/

router.get('/:id', async (req: any, res: any) => {
  try {
    const id = req.params.id
    const data = await db.select().from(users).where(eq(users.id,id))
    if (data) {
      return res.status(200).json({ "message": "fetched", data: data })
    }
    return res.status(400).json({ "message": "unable to fetch", data: data })
  } catch (err) {
    return res.status(500).json({ "message": "Internal Server Error", 'data': err })
  }
})

/**
 * @swagger
 * /:
 *   get:
 *     tags: [User]
 *     summary: Get all User
 *     responses:
 *       '200':
 *         description: Successfully fetched
 *       '400':
 *         description: Not found
 *       '500':
 *         description: Internal server error
*/

router.get('',async (req: any, res: any) => {
  try {
    const data = await db.select().from(users)
    if (data) {
      return res.status(200).json({ "message": "fetched", data: data })
    }
    return res.status(400).json({ "message": "unable to fetch", data: data })
  } catch (err) {
    return res.status(500).json({ "message": "Internal Server Error", 'data': err })
  }
})

/**
 * @swagger
 * /{id}:
 *   delete:
 *     tags: [User]
 *     summary: Delete User By Id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *     responses:
 *       '200':
 *         description: Successfully fetched
 *       '400':
 *         description: Not found
 *       '500':
 *         description: Internal server error
*/

router.delete('/:id',async (req: any, res: any) => {
  try {
    const id = req.params.id
    const data = await db.delete(users).where(eq(users.id,id)).returning()
    if (data.length) {
      return res.status(200).json({ "message": "fetched", data: data })
    }
    return res.status(400).json({ "message": "unable to fetch", data: data })
  } catch (err) {
    return res.status(500).json({ "message": "Internal Server Error", 'data': err })
  }
})
export default router