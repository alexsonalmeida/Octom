import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase;

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY,
    );
  }

  async uploadFile(path: string, file: Express.Multer.File) {
    const { data, error } = await this.supabase.storage
      .from('files')
      .upload(path, file.buffer, {
        contentType: file.mimetype,
      });

    if (error) {
      return { error };
    }

    const { publicURL, error: urlError } = this.supabase.storage
      .from('files')
      .getPublicUrl(path);

    if (urlError) {
      return { error: urlError };
    }

    return {
      path: data?.path,
      publicUrl: publicURL,
    };
  }
}
