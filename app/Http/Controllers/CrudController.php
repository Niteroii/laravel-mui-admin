<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CrudController extends Controller
{
    protected $entity;

    public function loadEntity($entity)
    {
    }

    /**
     * Mostra a lista de todos os itens.
     *
     * @param \Illuminate\Http\Request $request Requisição injetada pelo Laravel
     * @param string                   $entity  Nome da entidade
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, $entity)
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

        $query = $this->beginQuery();

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
    public function beginQuery()
    {
        return $this->entity::query();
    }

    /**
     * Realiza um novo cadastro de item.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validateForCreate($request);

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
    public function show($id)
    {
        $item = $this->beginQuery()->findOrFail($id);

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
        $this->validateForUpdate($request);

        $item = $this->beginQuery()->findOrFail($id);

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
     * @param \Illuminate\Http\Request $request
     * @param mixed                    $id
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $item = $this->beginQuery()->findOrFail($id);

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
        return new $this->entity();
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
