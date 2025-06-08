import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('SUPABASE_URL e SUPABASE_KEY devem estar definidas nas variáveis de ambiente');
    }

    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async uploadFile(path: string, file: Express.Multer.File) {
    try {
      if (!file || !file.buffer) {
        throw new InternalServerErrorException('Arquivo não fornecido ou está corrompido');
      }

      const { data, error } = await this.supabase.storage
        .from('files')
        .upload(path, file.buffer, {
          contentType: file.mimetype,
          upsert: true,
        });

      if (error) {
        console.error('Erro no upload do Supabase:', error);
        throw new InternalServerErrorException(`Erro ao fazer upload: ${error.message}`);
      }

      if (!data || !data.path) {
        throw new InternalServerErrorException('Upload foi bem-sucedido, mas não retornou o caminho do arquivo');
      }

      const { data: publicUrlData } = this.supabase.storage
        .from('files')
        .getPublicUrl(path);

      if (!publicUrlData || !publicUrlData.publicUrl) {
        throw new InternalServerErrorException('Erro ao gerar URL pública do arquivo');
      }

      return {
        path: data.path,
        publicUrl: publicUrlData.publicUrl,
      };
    } catch (error) {
      console.error('Erro no SupabaseService.uploadFile:', error);
      
      if (error instanceof InternalServerErrorException) {
        throw error;
      }
      
      throw new InternalServerErrorException('Erro interno ao fazer upload do arquivo');
    }
  }
}