<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class RepositoryController extends Controller
{
    public function entity(Request $request)
    {
        $name = $request->route()->getName();

        [$name, $_action] = explode('.', $name);

        $class = '\\App\\Models\\' . \Str::studly($name);

        if (!class_exists($class)) {
            throw new \Exception('Classe não encontrada: ' . $class);
        }

        return $class;
    }

    /**
     * Mostra a lista de todos os itens.
     *
     * @param \Illuminate\Http\Request $request Requisição injetada pelo Laravel
     * @param string                   $entity  Nome da entidade
     *
     * @return \Illuminate\Http\Response
     */
    public function list(Request $request)
    {
        $request->validate([
            'page' => 'integer',
            'per_page' => 'integer',
            'q' => 'string',
        ]);

        $per_page = 15;

        if ($request->has('per_page')) {
            $per_page = $request->per_page;
        }

        $query = $this->beginQuery($request);
        // $query = User::query();

        if ($request->has('q') && !empty($request->q)) {
            $query = $this->search($query, $request->q);
        }

        $query = $query->paginate($per_page);

        return response()->json($query, 200);

        // return view('users.index')->with('users',$users);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function beginQuery(Request $request)
    {
        return $this->entity($request)::permitted();
    }

    /**
     * Realiza um novo cadastro de item.
     *
     * @return \Illuminate\Http\Response
     */
    public function new(Request $request)
    {
        $this->entity($request)::validateForCreate($request);

        $item = $this->create();

        $this->fill($request, $item);

        $item->save();

        $this->afterModelSaved($request, $item);

        return response()->json(['message' => 'OK'], 200);

        // return redirect('/users');
    }

    /**
     * Faz a listagem de um item específico.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function get(Request $request, $id)
    {
        $item = $this->beginQuery($request)->findOrFail($id);

        return response()->json($item, 200);
    }

    /**
     * Faz o update dos itens cadastrados.
     *
     * @param mixed $id
     *
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->entity($request)::validateForUpdate($request);

        $item = $this->beginQuery($request)->findOrFail($id);

        $this->fill($request, $item);

        $item->update();

        $this->afterModelSaved($request, $item);

        return response()->json([
            'message' => 'OK',
        ], 200);

        // return view('users.show')->with('user',$user);
    }

    /**
     * Deleta um item cadastrado.
     *
     * @param mixed $id
     *
     * @return \Illuminate\Http\Response
     */
    public function delete(Request $request, $id)
    {
        $item = $this->beginQuery($request)->findOrFail($id);

        $item->delete();

        return response()->json(['message' => 'OK'], 200);

        // return redirect("/users");
    }

    /**
     * Cria uma entity para a controller.
     *
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function create()
    {
        $classname = $this->entity(request());

        return new $classname();
    }

    /**
     * Preenche uma entidade com os dados da requisição.
     *
     * @param \Illuminate\Database\Eloquent\Model $item Item a ser preenchido
     */
    public function fill(Request $request, $item)
    {
        $item->fill($request->all());
    }

    /**
     * Executa a busca no conjunto de dados.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string                                $search
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function search($query, $search)
    {
        return $query;
    }

    /**
     * Dispara após o salvamento de um model.
     *
     * @param \Illuminate\Database\Eloquent\Model $item
     */
    public function afterModelSaved(Request $request, $item)
    {
    }
}
