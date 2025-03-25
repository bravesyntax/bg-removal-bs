import { Svix } from "svix";
import userModel from "../models/userModel.js";

// API controller function to manage Clerk webhooks
const clerkWebHooks = async (req, res) => {
  try {
    const wHook = new Svix(process.env.CLERK_WEBHOOK_SECRET);

    // Verify the webhook
    await wHook.verify(req.headers, req.body);

    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };

        await userModel.create(userData);
        res.status(200).json({ success: true });

        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };

        await userModel.findOneAndUpdate({ clerkId: data.id }, userData);
        res.status(200).json({ success: true });

        break;
      }

      case "user.deleted": {
        await userModel.findOneAndDelete({ clerkId: data.id });
        res.status(200).json({ success: true });
        break;
      }

      default:
        res.status(400).json({ success: false, message: "Unknown event type" });
        break;
    }
  } catch (error) {
    console.error("Webhook Error:", error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export { clerkWebHooks };
