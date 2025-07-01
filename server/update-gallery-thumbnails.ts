import { db } from "./db";
import { galleryItems } from "@shared/schema";
import { eq } from "drizzle-orm";

// Function to extract first image URL from HTML content
function extractFirstImageFromHTML(htmlContent: string): string {
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/i;
  const match = htmlContent.match(imgRegex);
  return match ? match[1] : "";
}

export async function updateGalleryThumbnails(): Promise<{ success: boolean; message: string; updated: number }> {
  try {
    console.log("Starting gallery thumbnail update...");
    
    // Get all gallery items without imageUrl
    const items = await db.select().from(galleryItems);
    
    let updatedCount = 0;
    
    for (const item of items) {
      // If imageUrl is empty but description has images, extract first image
      if ((!item.imageUrl || item.imageUrl.trim() === "") && item.description) {
        const firstImageUrl = extractFirstImageFromHTML(item.description);
        
        if (firstImageUrl) {
          await db
            .update(galleryItems)
            .set({ imageUrl: firstImageUrl })
            .where(eq(galleryItems.id, item.id));
          
          console.log(`Updated thumbnail for gallery item ${item.id}: ${item.title}`);
          updatedCount++;
        }
      }
    }
    
    console.log(`Gallery thumbnail update completed. Updated ${updatedCount} items.`);
    
    return {
      success: true,
      message: `Successfully updated ${updatedCount} gallery thumbnails`,
      updated: updatedCount
    };
    
  } catch (error) {
    console.error("Error updating gallery thumbnails:", error);
    return {
      success: false,
      message: `Failed to update gallery thumbnails: ${error instanceof Error ? error.message : 'Unknown error'}`,
      updated: 0
    };
  }
}

// Run this script if called directly
if (require.main === module) {
  updateGalleryThumbnails()
    .then(result => {
      console.log("Result:", result);
      process.exit(0);
    })
    .catch(error => {
      console.error("Script failed:", error);
      process.exit(1);
    });
}