import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Octokit } from '@octokit/rest'
import Env from '@ioc:Adonis/Core/Env'

export default class RepositoriesController {
  public async index(ctx: HttpContextContract) {
    try {
      const octokit = new Octokit({
        auth: Env.get("GITHUB_APP_TOKEN"),
      });

      const response = await octokit.request('Get /user/repos?type=private', {});
      const repositoryData = response.data;
    
      const repositories = repositoryData.map((repo) => repo.full_name)
      return ctx.response.status(200).json(repositories);
    } catch (error) {
      console.error(error)
      ctx.response.status(500).json({ error: 'Internal Server Error', err: error.message })
    }
  }
}
