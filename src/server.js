import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import mongoose from 'mongoose'; // Add mongoose import
import { ENV_VARS } from './constants/index.js';
import { env } from './utils/env.js';
import { getAllContacts, getContactById } from './services/contacts.js';
import { notFoundMiddleware } from './middlewares/notFoundMiddleware.js';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware.js';
import { isValidId } from './middlewares/isValidId.js'; // Import your custom middleware

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/contacts', async (req, res, next) => {
    try {
      const contacts = await getAllContacts();
      res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
      });
    } catch (error) {
      next(error);
    }
  });

  // Use the isValidId middleware before the main route handler
  app.get('/contacts/:contactId', isValidId, async (req, res, next) => {
    try {
      const contactId = req.params.contactId;
      const contact = await getContactById(contactId);

      if (!contact) {
        return res.status(404).json({
          status: 404,
          message: `Contact with id ${contactId} not found!`,
        });
      }

      res.json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
      });
    } catch (err) {
      next(err);
    }
  });

  app.use('*', notFoundMiddleware);
  app.use(errorHandlerMiddleware);

  const PORT = env(ENV_VARS.PORT, 3000);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
  });
};
