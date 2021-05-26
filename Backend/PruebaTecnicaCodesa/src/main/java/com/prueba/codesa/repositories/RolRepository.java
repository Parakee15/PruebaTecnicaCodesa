package com.prueba.codesa.repositories;

import com.prueba.codesa.models.RolModel;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RolRepository extends CrudRepository<RolModel,Long> {
}
